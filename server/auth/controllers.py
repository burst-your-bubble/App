from flask import Blueprint, redirect, make_response, request, session, jsonify
from server.data.models import User
from server.data.db import Session
from server.config import mysql_connection_string
import uuid
import hashlib

auth = Blueprint('auth', __name__, template_folder='templates')

@auth.route("/register", methods=['POST'])
def register_user():
    email = request.form['email']
    salt = uuid.uuid4().hex
    pwstring = request.form['password'] + salt
    password = hashlib.sha256(pwstring.encode('utf-8')).hexdigest()

    # Check if user already exists in the database
    existing_user = User.query.filter(User.name == email).first()
    if existing_user is not None:
        return redirect('/login')

    # Register new user
    new_user = User(name=email, password=password, salt=salt, score=0)
    Session().add(new_user)
    Session().commit()

    response = make_response(redirect('/quiz'))
    response.set_cookie('user_id', str(new_user.id))
    return response

@auth.route("/login", methods=['POST'])
def login_user():
    email = request.form['email']
    user = User.query.filter(User.name == email).first()
    if user is None:
        return jsonify({'success': False, 'message': 'Email Not Found'})

    pwstring = request.form['password'] + user.salt
    password = hashlib.sha256(pwstring.encode('utf-8')).hexdigest()

    if user.password != password:
        return jsonify({'success': False, 'message': 'Incorrect Password'})

    response = make_response(jsonify({'success': True, 'message': 'Successful Login'}))
    response.set_cookie('user_id', str(user.id))
    return response
