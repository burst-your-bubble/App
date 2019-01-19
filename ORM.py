from __future__ import unicode_literals, absolute_import
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime,ForeignKey,create_engine
from sqlalchemy.orm import relationship,sessionmaker
ModelBase = declarative_base()
class User(ModelBase):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(length=32))
    password = Column(String(length=32))
    history = relationship('history')
class History(ModelBase):
    __tablename__ = 'history'
    articleID = Column(Integer,primary_key=True)
    response = Column(Integer)
    userID = Column(Integer, ForeignKey('user.id'),primary_key=True)
class Article(ModelBase):
    __tablename__ = 'article'

    articleID = Column(String(32),primary_key=True)
    response = Column(Integer)
def getUser(DBSession,id):
	session = DBSession()
	user = session.query(User).filter(User.id==id).all()
	session.close()
	return user
def addUser(DBSession,username,password):
	session = DBSession()
	new_user = User(username=username, password='password')
	session.add(new_user)
	session.close()
def main():
	connection_string = "mysql+mysqlconnector://mastercomps:doe_a_deer_a_rainbow_deer@mysql-production.cdosgqjv22py.us-west-2.rds.amazonaws.com:3306/mydatabase"
	engine = create_engine(connection_string)
	DBSession = sessionmaker(bind=engine)
main()
