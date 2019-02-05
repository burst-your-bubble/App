from flask import Blueprint, render_template, redirect, request, jsonify
from server.data.models import Article, Topic, User, History
# from server.cache import cache
from server.data.db import Session
from server.config import mysql_connection_string

dummy_user_id = 1

api = Blueprint('api', __name__)

@api.route("/topics", methods=['GET'])
def json_topics():
    # Cache this query for better performance, and it only changes once a day?
    topics = get_topics()
    read = read_articles(dummy_user_id)
    for topic in topics:
        for article in topic['articles']:
            article['read'] = article['id'] in read.keys()
            if article['read']:
                article['response'] = int(read[article.get('id')])
            else:
                article['response'] = None
    return jsonify({ 'topics' : topics })

@api.route('/article/<id>', methods=['GET'])
def json_article(id):
    article = get_article(id)
    return jsonify(article)

@api.route('/article/<id>/respond', methods=['POST'])
def respond_to_article(id):
    response = request.get_json()['response']
    addResponse(dummy_user_id, id, response)
    return str(response)

def get_articles_list(topicID):
    articles = Article.query.with_entities(
        Article.id,
        Article.title,
        Article.summary,
        Article.topicID
    ).filter(Article.topicID == topicID).all()

    articles = [{
            'id': article[0],
            'title': article[1],
            'summary': article[2],
            'topicID': article[3],
        } for article in articles ]

    return articles

def get_article(articleID):
    article = Article.query.filter(Article.id == articleID).first()
    return article.to_json()

# @cache.cached(timeout=30)
def get_topics():
    topics = Topic.query.all()
    topics = [{
        'story': topic.headline,
        'articles': get_articles_list(topicID=topic.id)
    } for topic in topics]

    return topics

# def addResponse(userID,articleID,response):
#     res = History.query.with_entities(
#         History.response
#     ).filter(
#         History.userID==userID,History.articleID==articleID,
#     ).first()

#     print(res)

#     if res is None:
#         new_history = History(articleID=articleID, 
#                         userID=userID,
#                         response = response)
#         Session().add(new_history)
#         Session().commit()
    
#     else:
#         changeResponse(userID,articleID,response)
# def addResponse1(userID,articleID,response):
#     session = Session()
#     old = session.query(History).filter_by(userID = userID,articleID = articleID).first()
#     new_history = History(articleID=articleID, userID=userID,response = response)
#     if old != None:
#         old.response = response
#         recaluate(userID,articleID,response)
#         old.delete() 
#         session.add(new_history)
#         return
#     session.add(new_history)
#     if response == 0:
#         session.commit()
#         session.close()
#         return
#     user = session.query(User).filter(User.id==userID).first()
#     score = user.score
#     sign = [-1,1][score >= 0]
#     article = session.query(Article).filter(Article.id==articleID).first()
#     stance = [1,-1][article.stance== 'L']
#     if stance != 0:
#         target = stance * response
#     else:
#         target = -sign * response
#     if target == sign:
#         newScore = (target + score)/2.0
#     else:
#         newScore = score/2.0 - 0.1 * sign
#     change = newScore - score 
#     if abs(score) < 0.25:
#         change = change/2.0
#     user.score += change
#     print(stance,change,user.score)
#     session.commit()
#     session.close()
# def recaluate1(userID):
#     all_history = session.query(History).filter_by(id = userID).order_by(History.created_at).all()
#     user = session.query(User).filter(User.id==userID).first()
#     response = 
#     score = 0
#     for article in all_history:
#         sign = [-1,1][score >= 0]
#         stance = [1,-1][article.stance== 'L']
#         if stance != 0:
#             target = stance * article.response
#         else:
#             target = -sign * article.response
#         if target == sign:
#             newScore = (target + score)/2.0
#         else:
#             newScore = score/2.0 - 0.1 * sign
#         change = newScore - score 
#         if abs(score) < 0.25:
#             change = change/2.0
#         score += change
#     user.score = score
#     print(score) 
def addResponse(userID,articleID,response):
    session = Session()
    user = session.query(User).filter(User.id==userID).first()
    old = session.query(History).filter_by(userID = userID,articleID = articleID).first()
    article = session.query(Article).filter(Article.id==articleID).first()
    sign = [-1,1][user.score >= 0]
    all_history = session.query(History).filter_by(userID = userID).order_by(History.createdAt).all()
    lens = len(all_history)
    prev_score = lens* user.score
    stance = [1,-1][article.stance== 'L']
    if article.stance == 'C':
        stance = 0
        if score == 0:
            return 
    if old != None:
        if int(old.response) == response:
            return
        print(stance)
        prev_response = int(old.response)
        old.response = response
        if stance == 0:
            prev_score += response * sign
            prev_score -= prev_response * sign
        else:
            print(prev_score,type(prev_response),type(stance))
            prev_score += response * stance
            prev_score -= prev_response * stance
        user.score = prev_score/float(lens)
    else:
        if stance == 0:
            prev_score += response * sign
        else: 
            prev_score += response * stance
        new_history = History(articleID=articleID, userID=userID,response = response)
        session.add(new_history)
        user.score = prev_score/float(lens+1)
    session.commit()
    return user.score
# def recaluate(userID):
#     #all_history = [['L',1],['L',1],['L',1],['L',1],['L',1],['R',1],['L',1],['R',1],['L',1],['R',1],['L',1],['R',1],['L',1],['L',1],['R',1],['L',1],['L',1],['L',1],['L',1],['L',1]]
#     all_history = session.query(History).filter_by(userID = userID).order_by(History.created_at).all()
#     score = 0
#     for history in all_history:
#         sign = [-1,1][score >= 0]
#         article = session.query(Article).filter(Article.id==history.articleID).first()  
#         stance = [1,-1][article.stance== 'L']
#         response = history.response
#         user = session.query(User).filter(User.id==userID).first()
#         if response == 0:
#             continue
#         if stance == 'C':
#             score-= (response * sign)/2.0
#         else:
#             score+=stance   
#     avg = score/float(len(all_history))
#     user.score = avg
#     session.commit()
#     return avg 
def read_articles(user_id):
    res = History.query.with_entities(
        History.articleID, History.response
    ).filter(
        History.userID==user_id
    ).all()
    return { row[0]: row[1] for row in res }
