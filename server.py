from flask import Flask, render_template
from news.ORM import getTopics, getArticleByID
from news.config import username, pw, host, db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json

app = Flask(__name__, static_folder="./static", template_folder="./static")

def get_db_session():
    connection_string = "mysql+mysqlconnector://{0}:{1}@{2}:3306/{3}".format(username, pw, host, db)
    engine = create_engine(connection_string)
    DBSession = sessionmaker(bind=engine)
    return DBSession

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/article/<id>")
def article(id):
    return render_template("index.html")

@app.route("/json/topics")
def json_topics():
    DBSession = get_db_session()
    # Cache this query for better performance, and it only changes once a day?
    topics = { 'topics': getTopics(DBSession) }
    return json.dumps(topics)

@app.route('/json/article/<id>')
def json_article(id):
    DBSession = get_db_session()
    article = getArticleByID(DBSession, id)
    return json.dumps(article)

@app.route("/json/mock-topics")
def mock_response():
    return render_template('mock-topics.json')

@app.route("/json/mock-article/<id>")
def mock_article(id):
    return render_template('mock-article.json')

if __name__ == "__main__":
    app.run(debug=True)
