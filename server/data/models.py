from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Column, Integer, String, DateTime, Text, CHAR, DATE, ForeignKey,Float

from .db import Session
import datetime
ModelBase = declarative_base()

class User(ModelBase):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(length=32))
    password = Column(String(length=32))
    salt = Column(String(length=32))
    score = Column(Float)

    query = Session.query_property()
    #history = relationship('history', backref="user")

class History(ModelBase):
    __tablename__ = 'history'
    articleID = Column(Integer, ForeignKey('articles.id'),primary_key=True)
    response = Column(Integer)
    userID = Column(Integer, ForeignKey('users.id'),primary_key=True)
    createdAt = Column(DateTime,default=datetime.datetime.utcnow)
    query = Session.query_property()

class Reports(ModelBase):
    __tablename__ = 'reports'
    articleID = Column(Integer, ForeignKey('articles.id'),primary_key=True)
    reportType = Column(Text)
    userID = Column(Integer, ForeignKey('users.id'),primary_key=True)
    createdAt = Column(DateTime,default=datetime.datetime.utcnow)
    query = Session.query_property()

class Feedback(ModelBase):
    __tablename__ = 'feedback'
    userID = Column(Integer, ForeignKey('users.id'),primary_key=True)
    feedback = Column(Text)
    query = Session.query_property()

class Article(ModelBase):
    __tablename__ = 'articles'

    id = Column(Integer ,primary_key=True)
    title = Column(Text)
    author = Column(Text)
    source = Column(Text)
    summary = Column(Text)
    text = Column(Text)
    stance = Column(CHAR)
    rating = Column(Float)
    url = Column(Text)
    imageUrl = Column(Text)
    datePublished = Column(DATE)
    topicID = Column(Integer)

    query = Session.query_property()

    def to_json(self, list_view=False):
        if list_view:
            return {
                'id': self.id,
                'title': self.title,
                'summary': self.summary,
                'topicID': self.topicID
            }

        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}

class Topic(ModelBase):
    __tablename__ = 'topics'

    id = Column(Integer ,primary_key=True)
    headline = Column(Text)
    dateScraped = Column(DATE)

    query = Session.query_property()

    def to_json(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
