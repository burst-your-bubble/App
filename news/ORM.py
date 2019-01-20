from __future__ import unicode_literals, absolute_import
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text, CHAR, DATE, ForeignKey,create_engine
from sqlalchemy.orm import relationship,sessionmaker
ModelBase = declarative_base()

class User(ModelBase):
   __tablename__ = "users"

   id = Column(Integer, primary_key=True)
   name = Column(String(length=32))
   password = Column(String(length=32))
   #history = relationship('history', backref="user")

class History(ModelBase):
   __tablename__ = 'history'
   articleID = Column(Integer,primary_key=True)
   response = Column(Integer)
   userID = Column(Integer, ForeignKey('user.id'),primary_key=True)

class Article(ModelBase):
   __tablename__ = 'articles'

   id = Column(Integer ,primary_key=True)
   title = Column(Text)
   author = Column(Text)
   source = Column(Text)
   summary = Column(Text)
   text = Column(Text)
   stance = Column(CHAR)
   url = Column(Text)
   imageUrl = Column(Text)
   datePublished = Column(DATE)
   topicID = Column(Integer)

class Topic(ModelBase):
   __tablename__ = 'topics'

   id = Column(Integer ,primary_key=True)
   headline = Column(Text)
   dateScraped = Column(DATE)

def getUser(DBSession,id):
    session = DBSession()
    user = session.query(User).filter(User.id==id).first()
    session.close()
    return user

def addUser(DBSession,username,password):
    session = DBSession()
    new_user = User(name=username, password=password)
    session.add(new_user)
    session.commit()
    session.close()

def addResponse(DBSession,userID,articleID,response):
    session = DBSession()
    new_history = History(articleID=articleID, userID=userID,response = response)
    session.add(new_history)
    session.commit()
    session.close()

def changeResponse(DBSession,userID,articleID,response):
    session = DBSession()
    session.query(History).filter_by(userID = userID,articleID = articleID).delete()
    new_history = History(articleID=articleID, userID=userID,response = response)
    session.add(new_history)
    session.commit()
    session.close()

def getScore(DBSession,userID):
    session = DBSession()
    user_history = 0
    history = session.query(History).filter_by(userID = userID).all()
    for item in history:
        print(item.response)
        user_history += int(item.response)
    return user_history

def addTest(DBSession):
    addUser(DBSession,'ad','213')
    session = DBSession()
    user = session.query(User).all()
    for item in user:
        print(item.name)
        
def responseTest(DBSession):
    name = 'carleton'
    articleID = 1
    user = getUser(DBSession,name)
    # print(user.id)
    addResponse(DBSession,user.id,2,1)
    changeResponse(DBSession,user.id,articleID,-1)
    print(getScore(DBSession,user.id))

def getArticles(DBSession, id):
    session = DBSession()
    articles = session.query(Article).filter(Article.id==id).all()
    session.close()
    return articles

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

def main():
    connection_string = "mysql+mysqlconnector://mastercomps:doe_a_deer_a_rainbow_deer@mysql-production.cdosgqjv22py.us-west-2.rds.amazonaws.com:3306/mydatabase"
    engine = create_engine(connection_string)
    DBSession = sessionmaker(bind=engine)   
    responseTest(DBSession)

if __name__ == "__main__":
   main()
