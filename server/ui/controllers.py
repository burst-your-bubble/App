from flask import Blueprint, render_template

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
    return render_template("index.html")

@ui.route("/quiz")
def quiz():
    return render_template("index.html")

@ui.route("/article/<id>")
def article(id):
    return render_template("index.html")