from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    pfp_image_url = db.Column(db.String)
    bio = db.Column(db.String)

class Game(db.Model):
    __tablename__='games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=True)
    cover_art_url = db.Column(db.String)
    genre = db.Column(db.String)

class Review(db.Model):
    __tablename__='reviews'

    id = db.Column(db.Integer, primary_key=True)
    recommend = db.Column(db.Boolean, nullable = False)
    rev_text = db.Column(db.String)