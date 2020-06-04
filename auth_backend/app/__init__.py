import os
from flask import Flask
from config import config
from flask_migrate import Migrate

def create_app(config_name="default"):
    # create and configure the app
    app = Flask(__name__)

    app.config.from_object(config[config_name])

    from .models import db, bcrypt
    bcrypt.init_app(app)
    db.init_app(app)
    migrate = Migrate(app, db)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .routes import (
        GetUser, Register
    )
    app.add_url_rule('/get/<username>', view_func=GetUser.as_view('hello'))
    app.add_url_rule('/register', view_func=Register.as_view('register'))


    return app
