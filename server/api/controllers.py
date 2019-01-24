from flask import Blueprint, render_template
from server.data.models import Article, Topic, User
from server.data.db import Session
from server.config import mysql_connection_string
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json

api = Blueprint('api', __name__)

@api.route("/topics")
def json_topics():
    # Cache this query for better performance, and it only changes once a day?
    topics = { 'topics': getTopics() }
    return json.dumps(topics)

@api.route('/article/<id>')
def json_article(id):
    article = getArticleByID(id)
    return json.dumps(article)


def getArticles(topicID = None):
    if topicID is None:
        articles = Session.query(Article).all()
        #articles = Article.query.all()
        print("Articles: " + articles)
    else:
        articles = Session.query(Article).filter(Article.topicID == topicID).all()
        #articles = Article.query.filter(Article.topicID == topicID).all()
        print("Topic: " + str(topicID) + "Articles: " + str(len(articles)))

    articles = [{
        'id': article.id,
        'title': article.title,
        #'author': article.author,
        'source': article.source,
        'summary': article.summary,
        #'text': article.text,
        'stance': article.stance,
        'url': article.url,
        #'imageUrl': article.imageUrl,
        #'datePublished': str(article.datePublished)
    } for article in articles]

    return articles

# Better way to json-ify objects?
# https://stackoverflow.com/questions/5022066/how-to-serialize-sqlalchemy-result-to-json
def getArticleByID(articleID):
    article = Session.query(Article).filter(Article.id == articleID).first()

    article = {
        'id': article.id,
        'title': article.title,
        'author': article.author,
        'source': article.source,
        'summary': article.summary,
        'text': article.text,
        'stance': article.stance,
        'url': article.url,
        'imageUrl': article.imageUrl,
        'datePublished': str(article.datePublished)
    } 

    return article

def getTopics():
    topics = Session.query(Topic).all()
    topics = [{
        'story': topic.headline,
        'articles': getArticles(topicID=topic.id)
    } for topic in topics]

    return topics