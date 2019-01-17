from flask import Flask, render_template

app = Flask(__name__, static_folder="../static", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/article/<id>")
def article(id):
    return render_template("index.html")

@app.route("/mock-response")
def mock_response():
    return render_template('mock-response.json')

if __name__ == "__main__":
    app.run(debug=True, host= '0.0.0.0')