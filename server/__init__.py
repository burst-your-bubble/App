from flask import Flask
# from flask_caching import Cache
from server.auth.controllers import auth
from server.ui.controllers import ui
from server.api.controllers import api
from server.data.db import Session
from server.config import flask_secret_key
# from server.cache import cache

app = Flask(__name__, static_folder="../static", template_folder="./templates")
app.config['SECRET_KEY'] = flask_secret_key

# cache.init_app(app, config={'CACHE_TYPE':'simple'})

app.register_blueprint(auth)
app.register_blueprint(ui)
app.register_blueprint(api, url_prefix='/api')

@app.teardown_appcontext
def cleanup(resp_or_exc):
    Session.remove()
