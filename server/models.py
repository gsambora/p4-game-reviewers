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

    reviews = db.relationship("Review", back_populates = 'user')

class Game(db.Model):
    __tablename__='games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=True)
    cover_art_url = db.Column(db.String)
    genre = db.Column(db.String)

    reviews = db.relationship("Review", back_populates = 'game')

class Review(db.Model):
    __tablename__='reviews'

    id = db.Column(db.Integer, primary_key=True)
    recommend = db.Column(db.Boolean, nullable = False)
    rev_text = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    username = db.Column(db.String, db.ForeignKey('users.username'))
    pfp = db.Column(db.String, db.ForeignKey('users.pfp_image_url'))
    title = db.Column(db.String, db.ForeignKey('games.title'))

    user = db.relationship('User', back_populates='reviews')
    game = db.relationship('Game', back_populates='reviews')

    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

