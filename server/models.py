from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db
from sqlalchemy import CheckConstraint

# Models go here!
user_game_association = db.Table(
    'user_game_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('game_id', db.Integer, db.ForeignKey('games.id')),
    db.Column('rating', db.Integer, CheckConstraint('rating >= 1 AND rating <= 5')),
)

class User(db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    pfp_image_url = db.Column(db.String)
    bio = db.Column(db.String)

    reviews = db.relationship("Review", back_populates='user')
    games = db.relationship('Game', secondary=user_game_association, back_populates='users')

    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Game(db.Model):
    __tablename__='games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=True)
    cover_art_url = db.Column(db.String)
    genre = db.Column(db.String)

    reviews = db.relationship("Review", back_populates='game')
    users = db.relationship('User', secondary=user_game_association, back_populates='games')

    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}


class Review(db.Model):
    __tablename__='reviews'

    id = db.Column(db.Integer, primary_key=True)
    recommend = db.Column(db.Boolean, nullable = False)
    rev_text = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    user = db.relationship('User', back_populates='reviews')
    game = db.relationship('Game', back_populates='reviews')

    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

