from flask import Flask, render_template

app = Flask(__name__, static_folder="../static", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/article/<id>")
def article(id):
    return render_template("index.html")

@app.route("/json/mock-topics")
def mock_response():
    return render_template('mock-topics.json')

@app.route("/json/mock-article/<id>")
def mock_article(id):
    return render_template('mock-article.json')

if __name__ == "__main__":
    app.run(debug=True)