from flask import Flask
from server.ui.controllers import ui
from server.api.controllers import api
from server.data.db import Session

app = Flask(__name__, static_folder="../static", template_folder="./templates")

app.register_blueprint(ui)
app.register_blueprint(api, url_prefix='/api')

@app.teardown_appcontext
def cleanup(resp_or_exc):
    Session.remove()