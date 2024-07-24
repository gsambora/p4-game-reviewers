"""Add rating association table

Revision ID: f4cfa368cc86
Revises: 54c2cd204448
Create Date: 2024-07-23 23:04:19.199355

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4cfa368cc86'
down_revision = '54c2cd204448'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ratings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('game_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], name=op.f('fk_ratings_game_id_games')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_ratings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user_game_reviews')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_game_reviews',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('game_id', sa.INTEGER(), nullable=True),
    sa.Column('review_id', sa.INTEGER(), nullable=True),
    sa.Column('rating', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], name='fk_user_game_reviews_game_id_games'),
    sa.ForeignKeyConstraint(['review_id'], ['reviews.id'], name='fk_user_game_reviews_review_id_reviews'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_game_reviews_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('ratings')
    # ### end Alembic commands ###
