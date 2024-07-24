#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Review, User, Game, user_game_association
from datetime import datetime
from sqlalchemy import func

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting all records")
        Review.query.delete()
        Game.query.delete()
        User.query.delete()

        fake = Faker()

        print("Creating users")

        u1 = User(username="Becca", pfp_image_url=fake.url(), bio=fake.paragraph(nb_sentences=1))
        u2 = User(username="Mochi", pfp_image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/IC_Blue_Melody_Flipper_CHA_male_EX1_CACIB.jpg/640px-IC_Blue_Melody_Flipper_CHA_male_EX1_CACIB.jpg', bio=fake.paragraph(nb_sentences=1))
        u3 = User(username="Chris", pfp_image_url=fake.url(), bio=fake.paragraph(nb_sentences=1))
        u4 = User(username="Neo", pfp_image_url=fake.url(), bio=fake.paragraph(nb_sentences=1))
        u5 = User(username="Tofu", pfp_image_url=fake.url(), bio=fake.paragraph(nb_sentences=1))

        db.session.add_all([u1,u2,u3,u4,u5])
        db.session.commit()

        print("Creating games")

        g1 = Game(title="Phoenix Wright: Ace Attorney", genre="Visual Novel", cover_art_url='https://static.wikia.nocookie.net/aceattorney/images/8/89/AA1_DS_Box_Art_America.png/revision/latest/scale-to-width-down/1000?cb=20131229163641')
        g2 = Game(title="Hades", genre="Roguelike", cover_art_url='https://media.wired.com/photos/5f6cf5ec6f32a729dc0b3a89/master/w_1600%2Cc_limit/Culture_inline_Hades_PackArt.jpg')
        g3 = Game(title="Stardew Valley", genre="RPG", cover_art_url='https://cdn.mobygames.com/covers/7453765-stardew-valley-playstation-4-front-cover.jpg')
        g4 = Game(title="The Sims 4", genre="Life Simulation", cover_art_url='https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/capsule_616x353.jpg?t=1721325243')

        db.session.add_all([g1,g2,g3,g4])
        db.session.commit()

        print("Creating reviews")
        r1=Review(recommend=True, rev_text=fake.paragraph(nb_sentences=2), user=u1, game=g1)
        r2=Review(recommend=True, rev_text=fake.paragraph(nb_sentences=2), user=u2, game=g1)
        r3=Review(recommend=False, rev_text=fake.paragraph(nb_sentences=2), user=u2, game=g3)
        r4=Review(recommend=True, rev_text=fake.paragraph(nb_sentences=2), user=u3, game=g2)
        r5=Review(recommend=False, rev_text=fake.paragraph(nb_sentences=2), user=u4, game=g4)
        r6=Review(recommend=True, rev_text=fake.paragraph(nb_sentences=2), user=u5, game=g4)
        r7=Review(recommend=True, rev_text=fake.paragraph(nb_sentences=2), user=u4, game=g3)
        r8=Review(recommend=True, rev_text=fake.paragraph(nb_sentences=2), user=u1, game=g4)

        db.session.add_all([r1,r2,r3,r4,r5,r6,r7,r8])
        db.session.commit()

        print("Creating associations")
        print("DateTime: ", datetime.now())
        user_game_tuples = [
            (u1, g1),
            (u2, g1),
            (u2, g3),
            (u3, g2),
            (u4, g4),
            (u5, g4),
            (u4, g3),
            (u1, g4),
        ]

        time = datetime.now()
        for (user, game) in user_game_tuples:
            new_association = user_game_association.insert().values(
                user_id=user.id,
                game_id=game.id,
                created_at=time
            )

            with db.engine.connect() as connection:
                connection.execute(new_association)

        db.session.commit()

        print("Complete")
        reviews = [review.to_dict() for review in Review.query.all()]
        print("All reviews: ", reviews)