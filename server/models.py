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

    ratings = db.relationship("Rating", back_populates='user', cascade='all, delete-orphan')

    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}


class Game(db.Model):
    __tablename__='games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=True)
    cover_art_url = db.Column(db.String)
    genre = db.Column(db.String)

    reviews = db.relationship("Review", back_populates = 'game')

    ratings = db.relationship("Rating", back_populates='game', cascade='all, delete-orphan')

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

class Rating(db.Model):
    __tablename__='ratings'

    id=db.Column(db.Integer, primary_key=True)
    rating=db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    user = db.relationship('User', back_populates='ratings')
    game = db.relationship('Game', back_populates='ratings')

    __table_args__ = (
        db.CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating'),
    )
    
    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
