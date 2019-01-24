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
    topics = { 'topics': get_topics() }
    return json.dumps(topics)

@api.route('/article/<id>')
def json_article(id):
    article = get_article(id)
    return json.dumps(article)

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
            'topicID': article[3]
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