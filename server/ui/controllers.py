from flask import Blueprint, render_template, redirect, request

ui = Blueprint('ui', __name__, 
                template_folder='templates')

@ui.route("/")
def index():
    return render_template("index.html")

@ui.route("/register")
def registe():
    return render_template("index.html")

@ui.route("/home")
def home():
    if not user_logged_in():
        return redirect('/')
    return render_template("index.html")

@ui.route("/article/<id>")
def article(id):
    if not user_logged_in():
        return redirect('/')
    return render_template("index.html")

def user_logged_in():
    return request.cookies.get('user_id') is not None