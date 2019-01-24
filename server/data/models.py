from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text, CHAR, DATE, ForeignKey

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