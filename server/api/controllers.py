from flask import Blueprint, render_template, redirect, request, jsonify, abort
from server.data.models import Article, Topic, User, History, Reports
# from server.cache import cache
from server.data.db import Session
from server.config import mysql_connection_string

api = Blueprint('api', __name__)
# experienced is a constant that define when user can affect article rating score.
experienced = 10
@api.route("/topics", methods=['GET'])
def json_topics():
    if not user_logged_in():
        abort(401)

    # Cache this query for better performance, and it only changes once a day?
    topics = get_topics()
    read = read_articles(get_user())
    for topic in topics:
        for article in topic['articles']:
            article['read'] = article['id'] in read.keys()
            if article['read']:
                article['response'] = int(read[article.get('id')])
            else:
                article['response'] = None
    score = get_score(get_user())
    return jsonify({ 'topics' : topics, 'score': score })

@api.route('/article/<id>', methods=['GET'])
def json_article(id):
    if not user_logged_in():
        abort(401)

    article = get_article(id)
    return jsonify(article)

@api.route('/article/<id>/respond', methods=['POST'])
def respond_to_article(id):
    if not user_logged_in():
        abort(401)

    response = request.get_json()['response']

    addResponse(get_user(), id, response)
    return str(response)

@api.route('/article/<id>/report', methods=['POST'])
def report_article(id):
    if not user_logged_in():
        abort(401)

    reportType = request.get_json()['reportType']

    addReport(get_user(), id, reportType)
    return str(reportType)

def get_articles_list(topicID):
    articles = Article.query.with_entities(
        Article.id,
        Article.title,
        Article.summary,
        Article.stance,
        Article.topicID
    ).filter(Article.topicID == topicID).all()

    articles = [{
            'id': article[0],
            'title': article[1],
            'summary': article[2],
            'stance': article[3],
            'topicID': article[4]
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

def addReport(userID,articleID,reportType):
    session = Session()
    new_report = Reports(articleID=articleID,userID=userID,reportType=reportType)
    session.add(new_report)
    session.commit()
    return reportType

def addResponse(userID,articleID,response):
    session = Session()
    user = session.query(User).filter(User.id==userID).first()
    old = session.query(History).filter_by(userID = userID,articleID = articleID).first()
    article = session.query(Article).filter(Article.id==articleID).first()
    sign = [-1,1][user.score >= 0]
    all_history = session.query(History).filter_by(userID = userID).order_by(History.createdAt).all()
    lens = len(all_history)
    print(lens)
    prev_score = lens* user.score
    old_score = user.score
    # Total score = authority score + user rating(Limit the max to 1 and min to -1.)
    stance = [1,-1][article.stance== 'L'] 
    if article.stance == 'C':
        stance = 0
        if user.score == 0:
            return
    stance +=  max(-1,min(1,article.rating))
    # Need to change response
    if old != None:
        if int(old.response) == response:
            return
        prev_response = int(old.response)
        old.response = response
        if stance == 0:
            prev_score += response * sign
            prev_score -= prev_response * sign
        else:
            prev_score += response * stance
            prev_score -= prev_response * stance
        user.score = prev_score/float(lens)
    else:
    # Just add response
        if stance == 0:
            prev_score += response * sign
        else:
            prev_score += response * stance
        new_history = History(articleID=articleID, userID=userID,response = response)
        session.add(new_history)
        user.score = prev_score/float(lens+1)
    # Now User response will affect article score 
    if lens > experienced:
        article.rating += (response * 0.1 * user.score)
    session.commit()
    return user.score

def read_articles(user_id):
    res = History.query.with_entities(
        History.articleID, History.response
    ).filter(
        History.userID==user_id
    ).all()
    return { row[0]: row[1] for row in res }

def get_score(user_id):
    score = Session().query(User).filter_by(id = user_id).one().score
    return score

def get_user():
    return request.cookies['user_id']

def user_logged_in():
    return request.cookies.get('user_id') is not None
