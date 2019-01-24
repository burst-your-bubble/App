from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text, CHAR, DATE, ForeignKey
from .db import Session

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