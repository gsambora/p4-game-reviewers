#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Game, Review


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]

        return reviews, 200
    
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        return users, 200

class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]

        return games, 200

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        user_json = user.to_dict()

        return user_json, 200
    
class GameByID(Resource):
    def get(self, id):
        game = Game.query.filter(Game.id == id).first()
        game_json = game.to_dict()

        return game_json, 200

class ReviewByID(Resource):
    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()
        db.session.delete(review)
        db.session.commit()

        return {'message': 'Review deleted successfully.'}, 204

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')

        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
            else:
                return {'message': 'User not found.'}, 404
        else:
            return {}, 401
    
class Signup(Resource):
    def post(self):
        new_user = User(
            username=request.get_json().get('username'),
            pfp_image_url=request.get_json().get('pfp_image_url'),
            bio=request.get_json().get('bio')
        )

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        return new_user.to_dict(), 201

class Login(Resource):
    def post(self):
        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        if user:
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'message': 'User not found.'}, 404
        
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

class NewReview(Resource):
    def post(self):
        data = request.get_json()
        rec_bool = None
        if data.get('recommend') == "Y":
            rec_bool = True
        elif data.get('recommend') == "N":
            rec_bool = False

        gametitle = data.get('gametitle')
        game = Game.query.filter(Game.title == gametitle).first()
        if not game:
            return {'message': 'Game not found'}, 404
        else:
            new_review = Review(
                recommend=rec_bool,
                rev_text=data.get('text'),
                user_id = session.get('user_id'),
                game_id = game.id
            )
            
            db.session.add(new_review)
            db.session.commit()

            return new_review.to_dict(), 200

class CurrentReviews(Resource):
    def get(self):
        user_id = session['user_id']
        reviews = Review.query.filter_by(user_id=user_id).all()
        reviews_as_dicts = [review.to_dict() for review in reviews]

        return reviews_as_dicts, 200
    
class NewGame(Resource):
    def post(self):
        data = request.get_json()
        new_game = Game(
            title=data.get('gametitle'),
            cover_art_url=data.get('coverart'),
            genre=data.get('genre')
        )

        db.session.add(new_game)
        db.session.commit()

        return new_game.to_dict(), 200


api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Games, '/games', endpoint='games')
api.add_resource(UserByID, '/users/<int:id>', endpoint="user_by_id")
api.add_resource(GameByID, '/games/<int:id>', endpoint="game_by_id")
api.add_resource(ReviewByID, '/reviews/<int:id>', endpoint="review_by_id")

api.add_resource(CheckSession, '/check_session', endpoint="check_session")
api.add_resource(Signup, '/signup', endpoint="signup")
api.add_resource(Login, '/login', endpoint="login")
api.add_resource(NewReview, '/newreview', endpoint="newreview")
api.add_resource(Logout, '/logout', endpoint="logout")

api.add_resource(CurrentReviews, '/currentreviews', endpoint="currentreviews")
api.add_resource(NewGame, '/newgame', endpoint="newgame")

if __name__ == '__main__':
    app.run(port=5555, debug=True)  

