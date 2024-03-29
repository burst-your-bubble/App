import requests as rq
import json
import time
from sklearn.externals import joblib
import newspaper
from textblob import TextBlob
from functools import reduce
from server.config import api_key
import datetime
from py_linq import Enumerable
from difflib import SequenceMatcher
from string import punctuation
from nltk.corpus import stopwords
from nltk import word_tokenize, pos_tag
from news_pipeline.sources import sources

ARTICLE_CHAR_MIN = 500
NUM_LEFT_ARTICLES = 3
NUM_RIGHT_ARTICLES = 3
NUM_CENTER_ARTICLES = 2
MAX_NUM_TOPICS = 10


def get_topics_r_usnews():
    ''' Get top weekly stories from r/USNEWS '''

    url = "https://www.reddit.com/r/USNEWS/top.json?t=week"
    res = rq.get(url, headers = {'User-agent': 'Burst Your Bubble'})
    articles = json.loads(res.text)['data']['children']
    topics = [article['data']['title'] for article in articles]
    return topics


def get_topics_r_politics():
    ''' Get top daily stories from r/POLITICS '''

    url = "https://www.reddit.com/r/politics/top.json?t=day&limit=50"
    res = rq.get(url, headers = {'User-agent': 'Burst Your Bubble'})
    articles = json.loads(res.text)['data']['children']
    topics = [article['data']['title'] for article in articles]
    return topics


def get_topics_politico():
    ''' Get topc stories from Politico (via newsapi.org) '''

    url = "https://newsapi.org/v2/top-headlines?sources=politico&apiKey={0}"
    url = url.format(api_key)
    res = json.loads(rq.get(url, headers = {'User-agent': 'Burst Your Bubble'}).text)
    topics = [article['title'] for article in res['articles']]
    return topics


def get_articles_for_topic(topic):
    ''' Get articles from newsapi.org by a query string '''

    is_noun = lambda pos: pos[:2] == 'NN'
    tokenized = word_tokenize(topic)
    keywords = [word for (word, pos) in pos_tag(tokenized) if is_noun(pos)]
    query_text = reduce((lambda a, b: a + " " + b), keywords[:3], "")
    sources_text = reduce(lambda a, b: a+','+b, sources, '')
    url = "https://newsapi.org/v2/everything?q={0}&sortBy=relevance&pageSize=100&apiKey={1}&sources={2}"
    url = url.format(query_text, api_key, sources_text) 
    url = url.replace(' ', '%20')
    res = rq.get(url).text
    data = json.loads(res)
    try:
        print("{0} results returned for search: {1}".format(len(data['articles']), query_text))
    except KeyError as ex:
        print(ex)
        return []
    articles = data['articles']

    # If an article fails to download this keeps it in this list, just without the added keys
    for i in range(len(articles)):
        article = articles[i]
        try:
            a = newspaper.Article(article['url'])
            a.download()
            a.parse()
            article_text = a.text
            now = datetime.datetime.today().strftime('%Y-%m-%d')
            articles[i] = dict(article, text=article_text, dateScraped=now)
        except:
            print("Article {0} failed to download".format(article['url']))
            articles[i] = None
    articles = [a for a in articles if a is not None]
    return articles

    
def classify_article(article, clf):
    ''' Return article object with a L/C/R stance classification '''

    stance = clf.predict(article['text'])
    classified = dict(article, stance=stance)
    return classified

def filter_articles(articles, topic):
    ''' Return only the articles that are relevant to the given topic and meet the minimum character limit '''

    relevant = lambda a: compare_strings(topic, a['title'])
    articles = [a for a in articles if (a['title'] is not None and a['text'] is not None)]       
    articles = [a for a in articles if (relevant(a) and len(a['text']) >= ARTICLE_CHAR_MIN)]
    return articles


def group_articles(articles):
    ''' Group the articles by their policical stance '''

    e = Enumerable(articles)
    left = e.where(lambda a: a['stance'] == 'L').to_list()
    center = e.where(lambda a: a['stance'] == 'C').to_list()
    right = e.where(lambda a: a['stance'] == 'R').to_list()

    articles = left[:NUM_LEFT_ARTICLES] + center[:NUM_CENTER_ARTICLES] + right[:NUM_RIGHT_ARTICLES]
    return articles


def compare_strings(s1, s2):
    ''' Return true if the two strings share nouns '''

    is_noun = lambda pos: pos[:2] == 'NN'
    tokenized = word_tokenize(s1)
    nouns_s1 = [word.lower() for (word, pos) in pos_tag(tokenized) if is_noun(pos)]
    tokenized = word_tokenize(s2)
    nouns_s2 = [word.lower() for (word, pos) in pos_tag(tokenized) if is_noun(pos)]
    shared = [w for w in nouns_s1 if w in nouns_s2]
    return len(shared) > 1

def get_classified_news(clf, src="r/politics"):
    ''' Return a list of topics with related articles '''

    sources = ['r/politics','r/usnews','politico']
    if src not in sources:
        raise Exception("Invalid source")

    classified_news = []

    if src == "r/politics":
        topics = get_topics_r_politics()
    elif src == "r/usnews":
        topics = get_topics_r_usnews()
    elif src == "politico":
        topics = get_topics_politico()

    enough_articles = lambda a: len(a) >= 8

    for topic in topics:
        articles = get_articles_for_topic(topic)
        if not enough_articles(articles):
            continue

        articles = filter_articles(articles, topic)
        if not enough_articles(articles):
            continue

        classified_articles = []
        for article in articles:
            ca = classify_article(article, clf)
            if ca is None:
                continue
            classified_articles.append(ca)

        articles = group_articles(classified_articles)
        print("Topic: {0} returned {1} articles".format(topic, len(articles)))
        if not enough_articles(articles):
            continue

        classified_news.append({
            'headline': topic,
            'articles': articles
        })
        
    return classified_news[:MAX_NUM_TOPICS]