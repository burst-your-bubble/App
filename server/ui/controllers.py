from flask import Blueprint, render_template, redirect, request

ui = Blueprint('ui', __name__, 
                template_folder='templates')

@ui.route("/")
def index():
    return render_template("index.html")

@ui.route("/register")
def register():
    return render_template("index.html")

@ui.route("/history")
def history():
    return render_template("index.html")


@ui.route("/about")
def about():
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