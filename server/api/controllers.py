from flask import Blueprint, render_template
from server.data.models import Article, Topic, User
from server.config import username, pw, host, db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json

api = Blueprint('api', __name__)

@api.route("/topics")
def json_topics():
    DBSession = get_db_session()
    # Cache this query for better performance, and it only changes once a day?
    topics = { 'topics': getTopics(DBSession) }
    return json.dumps(topics)

@api.route('/article/<id>')
def json_article(id):
    DBSession = get_db_session()
    article = getArticleByID(DBSession, id)
    return json.dumps(article)

def get_db_session():
    connection_string = "mysql+mysqlconnector://{0}:{1}@{2}:3306/{3}".format(username, pw, host, db)
    engine = create_engine(connection_string)
    DBSession = sessionmaker(bind=engine)
    return DBSession

def getArticles(DBSession, topicID = None):
    session = DBSession()
    if topicID is None:
        articles = session.query(Article).all()
    else:
        articles = session.query(Article).filter(Article.topicID == topicID).all()
    session.close()

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

def getArticleByID(DBSession, articleID):
    session = DBSession()
    article = session.query(Article).filter(Article.id == articleID).first()

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

def getTopics(DBSession):
    session = DBSession()
    topics = session.query(Topic).all()
    session.close()

    topics = [{
        'story': topic.headline,
        'articles': getArticles(DBSession, topicID=topic.id)
    } for topic in topics]

    return topics