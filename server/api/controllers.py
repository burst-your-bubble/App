from flask import Blueprint, render_template, redirect, request, jsonify
from server.data.models import Article, Topic, User, History
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
            article['read'] = article['id'] in read
    return jsonify({ 'topics' : topics })

@api.route('/article/<id>', methods=['GET'])
def json_article(id):
    article = get_article(id)
    return jsonify(article)

@api.route('/article/<id>/respond', methods=['POST'])
def respond_to_article(id):
    response = request.form['response']
    addResponse(dummy_user_id, id, response)
    return redirect('/home')



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

def get_topics():
    topics = Topic.query.all()
    topics = [{
        'story': topic.headline,
        'articles': get_articles_list(topicID=topic.id)
    } for topic in topics]

    return topics

def addResponse(userID,articleID,response):
    new_history = History(articleID=articleID, 
                    userID=userID,
                    response = response)
    Session().add(new_history)
    Session().commit()

def read_articles(user_id):
    res = History.query.with_entities(
        History.articleID
    ).filter(
        History.userID==user_id,
    ).all()
    return [row[0] for row in res] 

