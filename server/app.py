#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
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

api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Games, '/games', endpoint='games')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

