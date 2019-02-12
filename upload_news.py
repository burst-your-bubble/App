from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.config import username, pw, host, db, mysql_connection_string
from server.data.models import Article, Topic
from news_pipeline.news_classifier import NewsClassifier
from news_pipeline.gather_news import get_classified_news 
import datetime

import json
import csv

CLASSIFIER_MODEL_PATH = "./news_pipeline/models/article-classifier_8000x3.pkl"

def uploadTopic(headline, date):
    new_topic = Topic(headline=headline, dateScraped=date)
    session.add(new_topic)
    session.commit()
    id = new_topic.id
    return id

def uploadArticle(article, topicID):
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

if __name__ == '__main__':
    engine = create_engine(mysql_connection_string)
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    clf = NewsClassifier(model_file=CLASSIFIER_MODEL_PATH)
    news = get_classified_news(clf)

    print(str(len(news)) + " topics to be uploaded")

    today = datetime.datetime.today().strftime('%Y-%m-%d')
    for topic in news:
        topicID = uploadTopic(topic['headline'], today)
        for article in topic['articles']:
            uploadArticle(article, topicID)  

    session.commit()
    session.close()

