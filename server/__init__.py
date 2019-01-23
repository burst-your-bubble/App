from flask import Flask
from server.ui.controller import ui
from server.api.controllers import api

app = Flask(__name__, static_folder="./static", template_folder="./templates")

app.register_blueprint(ui)
app.register_blueprint(api, url_prefix='/json')