from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    active = db.Column(db.Boolean, default=False, nullable=True)

    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")
    
    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class VerifyToken(db.Model):

    __tablename__ = "verification_tokens"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False)
    token = db.Column(db.String, nullable=False)
