from __future__ import unicode_literals, absolute_import
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime,ForeignKey,create_engine
from sqlalchemy.orm import relationship,sessionmaker
ModelBase = declarative_base()
class User(ModelBase):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(length=32))
    password = Column(String(length=32))
    score = Column(Double,default=0)
    #history = relationship('history', backref="user")
class History(ModelBase):
    __tablename__ = 'history'
    articleID = Column(Integer,primary_key=True)
    response = Column(Integer)
    userID = Column(Integer, ForeignKey('users.id'),primary_key=True)
class Article(ModelBase):
    __tablename__ = 'article'

    articleID = Column(String(32),primary_key=True)
    response = Column(Integer)
def getUser(DBSession,username):
    session = DBSession()
    user = session.query(User).filter(User.name==username).one()
    session.close()
    return user
# WARNING: USER CAN HAVE THE SAME USERNAME
def addUser(DBSession,username,password):
    session = DBSession()
    new_user = User(name=username, password=password)
    session.add(new_user)
    session.commit()
    session.close()
def addResponse(DBSession,userID,articleID,response):
    session = DBSession()
    session.query(History).filter_by(userID = userID,articleID = articleID).delete()
    new_history = History(articleID=articleID, userID=userID,response = response)
    session.add(new_history)
    if response == 0:
        session.commit()
        session.close()
        return
    user = session.query(User).filter(User.name==username).one()
    score = user.score
    sign = [-1,1][score >= 0]
    article = session.query(Article).filter_by(id = articleID)
    stance = article.stance
    if stance != 0:
        target = stance * response
    else:
        target = -sign * response
    if target == sign:
        newScore = (target + score)/2.0
    else:
        newScore = score/2.0 - 0.1 * sign
    user.score = newScore
    session.commit()
    session.close()
# def changeResponse(DBSession,userID,articleID,response):
#     session = DBSession()
#     session.query(History).filter_by(userID = userID,articleID = articleID).delete()
#     new_history = History(articleID=articleID, userID=userID,response = response)
#     session.add(new_history)
#     session.commit()
#     session.close()
def getScore(DBSession,userID):
    user = session.query(User).filter(User.name==username).one()
    return user.score
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

def main():
    connection_string = "mysql+mysqlconnector://mastercomps:doe_a_deer_a_rainbow_deer@mysql-production.cdosgqjv22py.us-west-2.rds.amazonaws.com:3306/mydatabase"
    engine = create_engine(connection_string)
    DBSession = sessionmaker(bind=engine)   
    responseTest(DBSession)
main()
