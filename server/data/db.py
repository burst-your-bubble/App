from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from server.config import mysql_connection_string

engine = create_engine(mysql_connection_string)

Session = scoped_session(sessionmaker(bind=engine))