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

    from .routes import jwt
    jwt.init_app(app)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .routes import (
        GetUser, Register, Login, FreshLogin,
        RefreshToken, Logout, ValidateToken,
        ValidateFreshToken, Resend, Verify
    )
    app.add_url_rule('/get', view_func=GetUser.as_view('hello'))
    app.add_url_rule('/register', view_func=Register.as_view('register'))
    app.add_url_rule('/login', view_func=Login.as_view('login'))
    app.add_url_rule('/fresh_login', view_func=FreshLogin.as_view('fresh_login'))
    app.add_url_rule('/refresh', view_func=RefreshToken.as_view('refresh'))
    app.add_url_rule('/logout', view_func=Logout.as_view('logout'))
    app.add_url_rule('/validate_token', view_func=ValidateToken.as_view('validate_token'))
    app.add_url_rule('/validate_fresh_token', view_func=ValidateFreshToken.as_view('validate_fresh_token'))
    app.add_url_rule('/resend/<user_email>', view_func=Resend.as_view('resend'))
    app.add_url_rule('/verify/<token>', view_func=Verify.as_view('verify'))


    import tests
    tests.test_init_app(app)

    return app
