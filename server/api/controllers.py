from flask import Blueprint, render_template, redirect, request, jsonify, abort
from server.data.models import Article, Topic, User, History, Reports, Feedback, Comment
# from server.cache import cache
from server.data.db import Session
from server.config import mysql_connection_string
from datetime import datetime, timezone
import pytz

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
    id = get_user()
    return jsonify({ 'topics' : topics, 'score': score, 'userId':id, })

@api.route('/article/<id>', methods=['GET'])
def json_article(id):
    if not user_logged_in():
        abort(401)

    article = get_article(get_user(), id)
    return jsonify(article)


@api.route('/history', methods=['GET'])
def json_history():
    if not user_logged_in():
        abort(401)

    id = get_user()
    history = read_history(id)
    score = get_score(id)
    return jsonify({'history': history, 'score': score, 'userID': id,})

@api.route('/scoregraph', methods=['GET'])
def json_score():
    if not user_logged_in():
        abort(401)

    id = get_user()
    graph_y = analyze(id)
    return jsonify({'graph_y': graph_y, 'userID': id,})

# This function use a sliding window to plot the score change of a given user
def analyze(userID):
    session = Session()
    user = session.query(User).filter(User.id==userID).first()
    all_history = session.query(History).filter_by(userID = userID).order_by(History.createdAt).all()
    lens = len(all_history)
    # Only analyze the experience user
    if lens <= experienced:
        return
    score,scoreList = recalculate(all_history,0,session)
    graph_y = [item/10.0 for item in scoreList]
    return graph_y

def read_history(user_id):
    readHistory = History.query.with_entities(
        History.articleID, History.response
    ).filter(
        History.userID==user_id
    ).all()

    lens = len(readHistory)

    if not lens:
        return

    articles = []

    for article in readHistory:
        id=article[0]
        articles.append(get_articles_overview(id, user_id))

    return articles

def get_articles_overview(articleID, userID):
    article = Article.query.with_entities(
        Article.id,
        Article.title,
        Article.summary,
        Article.stance,
        Article.url,
        Article.topicID
    ).filter(Article.id == articleID).first()

    readHistory = History.query.with_entities(
        History.articleID, History.response
    ).filter(
        History.userID==userID, History.articleID==articleID
    ).first()

    article = {
        'id': article[0],
        'title': article[1],
        'summary': article[2],
        'stance': article[3],
        'url': article[4],
        'topicID': article[5],
        'read': (readHistory is not None),
        'response': int(readHistory[1]) if readHistory is not None else None
    }

    return article

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

@api.route('/article/<id>/comment', methods=['POST'])
def add_comment(id):
    if not user_logged_in():
        abort(401)

    commentText = request.get_json()['text']

    comment = addComment(get_user(), id, commentText)
    return jsonify(comment)

@api.route('/feedback', methods=['POST'])
def feedback():
    if not user_logged_in():
        abort(401)

    feedback = request.get_json()['feedback']

    addFeedback(get_user(), feedback)
    return str(feedback)

def addFeedback(userID,feedback):
    session = Session()
    new_feedback = Feedback(userID=userID,feedback=feedback)
    session.add(new_feedback)
    session.commit()
    return feedback

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

def get_article(userID, articleID):
    article = Article.query.filter(Article.id == articleID).first()
    articleJSON = article.to_json()
    articleJSON['comments'] = [{"id": comment.id, "author": comment.user.name, "text": comment.text} for comment in article.comments]

    history = get_articles_overview(articleID, userID)
    articleJSON['read'] = history['read']

    return articleJSON

# @cache.cached(timeout=30)
def get_topics():
    ct = pytz.timezone('US/Central')
    today = datetime.now(ct).strftime('%Y-%m-%d')
    topics = Topic.query.filter(
        Topic.dateScraped == today
    ).all()
    topics = [{
        'id': topic.id,
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
    prev_score = lens* user.score
    old_score = user.score
    # Total score = authority score + user rating(Limit the max to 1 and min to -1.)
    stance = [1,-1][article.stance== 'L']
    if article.stance == 'C':
        stance = 0
        if user.score == 0:
            if old !=None:
               old.response = response
            else:
                new_history = History(articleID=articleID, userID=userID,response = response)
                session.add(new_history)
            session.commit()
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
        temp = prev_score/float(lens)
        user.score = max(-1,min(1,temp))
    else:
    # Just add response
        if stance == 0:
            prev_score += response * sign
        else:
            prev_score += response * stance
        new_history = History(articleID=articleID, userID=userID,response = response)
        session.add(new_history)
        temp = prev_score/float(lens+1)
        user.score = max(-1,min(1,temp))
    # Now User response will affect article score
    if lens > experienced:
        article.rating += (response * 0.1 * user.score)
    session.commit()
    return user.score

def addComment(userID, articleID, text):
    session = Session()
    user = session.query(User).filter(User.id==userID).first()

    new_comment = Comment(articleID=articleID, userID=userID, text=text)
    session.add(new_comment)
    session.commit()

    return {"id": new_comment.id, "author": user.name, "text": text}

# This function use a sliding window to plot the score change of a given user
def analyze(userID):
    session = Session()
    user = session.query(User).filter(User.id==userID).first()
    all_history = session.query(History).filter_by(userID = userID).order_by(History.createdAt).all()
    lens = len(all_history)
    # Only analyze the experience user
    if lens <= experienced:
        return
    score,scoreList = recalculate(all_history,0,session)
    graph_y = [item/10.0 for item in scoreList]
    return graph_y

# Return the change of score once add this history
def addOneHistory(score,article_stance,response):
    sign = [-1,1][score >= 0]
    stance = [1,-1][article_stance== 'L']
    if article_stance == 'C':
        stance = 0
        if score == 0:
            return 0
    if stance == 0:
        change = response * sign
    else:
        change = response * stance
    return change
# Given a start score and a list of history, it will return the final score if this list of history has been added to start scpre.
def recalculate(all_history,score,session):
    scoreList = [score]
    for i,history in enumerate(all_history):
        response = int(history.response)
        article = session.query(Article).filter(Article.id==history.articleID).first()
        score =score*0.7 + addOneHistory(score,article.stance,response)
        scoreList.append(score)
    return score,scoreList

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
