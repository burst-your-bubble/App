import requests as rq
import json
import time
from sklearn.externals import joblib
import newspaper
from textblob import TextBlob
from functools import reduce
from server.config import api_key
import datetime

# Get top weekly stories from US News subreddit
def get_topics_r_usnews():
    url = "https://www.reddit.com/r/USNEWS/top.json?t=week"
    res = rq.get(url, headers = {'User-agent': 'Burst Your Bubble'})
    while res.status_code == 429:
        time.sleep(0.1)
        res = rq.get(url, headers = {'User-agent': 'Burst Your Bubble'})
    articles = json.loads(res.text)['data']['children']
    topics = [article['data']['title'] for article in articles]
    return topics

# Get top daily stories from r/POLITICS
def get_topics_r_politics():
    url = "https://www.reddit.com/r/politics/top.json?t=day"
    res = rq.get(url, headers = {'User-agent': 'Burst Your Bubble'})
    while res.status_code == 429:
        print("429")
        time.sleep(0.1)
        res = rq.get(url, headers = {'User-agent': 'Burst Your Bubble'})
    articles = json.loads(res.text)['data']['children']
    topics = [article['data']['title'] for article in articles]
    return topics

# Get topc stories from Politico (via newsapi.org)
def get_topics_politico():
    url = "https://newsapi.org/v2/top-headlines?sources=politico&apiKey={0}"
    url = url.format(api_key)
    res = json.loads(rq.get(url, headers = {'User-agent': 'Burst Your Bubble'}).text)
    topics = [article['title'] for article in res['articles']]
    return topics


# Get articles from newsapi.org by a query string
def get_articles_for_topic(topic):
    # Change url from everything to top articles, and to filter to US articles
    query_text = reduce((lambda a, b: a + " " + b), TextBlob(topic).noun_phrases, "")
    url = "https://newsapi.org/v2/everything?q={0}&sortBy=relevance&apiKey={1}&sources='abc-news','al-jazeera-english','ars-technica','associated-press','axios','bleacher-report','bloomberg','breitbart-news','business-insider','buzzfeed','cbs-news','cnbc','cnn','crypto-coins-news','engadget','entertainment-weekly','espn','espn-cric-info','fortune','fox-news','fox-sports','google-news','hacker-news','ign','mashable','medical-news-today','msnbc','mtv-news','national-geographic','national-review','nbc-news','new-scientist','newsweek','new-york-magazine','next-big-future','nfl-news','nhl-news','politico','polygon','recode','reddit-r-all','reuters','techcrunch','techradar','the-american-conservative','the-hill','the-huffington-post','the-new-york-times','the-next-web','the-verge','the-wall-street-journal','the-washington-post','the-washington-times','time','usa-today','vice-news','wired'"
    url = url.format(query_text, api_key) 
    url = url.replace(' ', '%20')
    res = rq.get(url).text
    data = json.loads(res)
    return data['articles']


# Return article object with classification from newsapi article
def classify_article(article, clf):
    try:
        a = newspaper.Article(article['url'])
        a.download()
        a.parse()
    except:
        print("Article {0} failed to download".format(article['url']))
        return

    article_text = a.text

    stance = clf.predict(article_text)

    classified = {
        'title': article['title'],
        'author': article['author'],
        'source': article['source']['name'],
        'summary':article['description'],
        'text': article_text,
        'stance': stance,
        'url': article['url'],
        'imageUrl': article['urlToImage'],
        'datePublished': article['publishedAt'],
        'dateScraped': datetime.datetime.today().strftime('%Y-%m-%d')
    }

    return classified

'''
    Return a list of topics and related articles in the following format:

    [
        {
            headline: 
            articles: [
                {
                    title:
                    author:
                    source:
                    summary:
                    text:
                    stance:
                    url:
                    imageUrl:
                    datePublished:
                    dateScraped:  
                },...
            ]
        },...
    ]
'''
def get_classified_news(clf, src="r/politics"):
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

    i = 1
    for topic in topics:
        print("Topic {0} of {1}: {2}".format(i, len(topics), topic))
        i += 1

        try:
            articles = get_articles_for_topic(topic)
        except:
            continue

        if len(articles) < 5:
            continue

        classified_articles = []
        for article in articles:
            ca = classify_article(article, clf)
            if ca is None:
                continue
            classified_articles.append(ca)

        classified_news.append({
            'headline': topic,
            'articles': classified_articles[:10]
        })
    
    return classified_news