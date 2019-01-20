from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ORM import uploadArticle, uploadTopic
from config import username, pw, host, db
from news_classifier import NewsClassifier
from gather_news import get_classified_news 
import datetime

import json

connection_string = 'mysql+pymysql://{0}:{1}@{2}/{3}'.format(username, pw, host, db)
engine = create_engine(connection_string)
DBSession = sessionmaker(bind=engine)

# model_file_path = "./models/article-classifier_8000x3.pkl"
# clf = NewsClassifier(model_file=model_file_path)
# news = get_classified_news(clf)
# with open('./news.json', 'w') as f:
#     f.write(json.dumps(news))

news = ""
with open('./news.json', 'r') as f:
    news = f.read()
news = json.loads(news)

today = datetime.datetime.today().strftime('%Y-%m-%d')
for topic in news:
    topicID = uploadTopic(DBSession, topic['headline'], today)
    for article in topic['articles']:
        uploadArticle(DBSession, article, topicID)



