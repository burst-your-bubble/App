from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.config import username, pw, host, db
from server.data.models import Article, Topic
from news_pipeline.news_classifier import NewsClassifier
from news_pipeline.gather_news import get_classified_news 
import datetime

import json
import csv

def uploadTopic(DBSession, headline, date):
    session = DBSession()
    new_topic = Topic(headline=headline, dateScraped=date)
    session.add(new_topic)
    session.commit()
    id = new_topic.id
    session.close()
    return id

def uploadArticle(DBSession, article, topicID):
    session = DBSession()
    new_article = Article(
        title = article['title'],
        author = article['author'],
        source = article['source'],
        summary = article['summary'],
        text = article['text'],
        stance = article['stance'],
        url = article['url'],
        imageUrl = article['imageUrl'],
        datePublished = article['datePublished'],
        topicID = topicID
    )
    session.add(new_article)
    session.commit()
    session.close()

connection_string = 'mysql+pymysql://{0}:{1}@{2}/{3}'.format(username, pw, host, db)
engine = create_engine(connection_string)
DBSession = sessionmaker(bind=engine)

model_file_path = "./news_pipeline/models/article-classifier_8000x3.pkl"
clf = NewsClassifier(model_file=model_file_path)
news = get_classified_news(clf)

today = datetime.datetime.today().strftime('%Y-%m-%d')
for topic in news:
    topicID = uploadTopic(DBSession, topic['headline'], today)
    for article in topic['articles']:
        uploadArticle(DBSession, article, topicID)



