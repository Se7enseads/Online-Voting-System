from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = "/images/default.jpg"


class UserModel(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    admin = db.Column(db.String(), default=0)

    votes = db.relationship('VotesModel', back_populates='user')


class VotesModel(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    voter_id = db.Column(db.Integer, db.ForeignKey(
        'users.national_id'), nullable=False, unique=True)
    president = db.Column(db.Integer, nullable=False)
    vice_pres = db.Column(db.Integer, nullable=False)

    user = db.relationship('UserModel', back_populates='votes')


class CandidateModel(db.Model):
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    candidate_num = db.Column(db.Integer, nullable=False, unique=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80))
    certificate = db.Column(db.String(120), nullable=False)
    position = db.Column(db.String(80), nullable=False)
    pic_path = db.Column(db.String(120), default=DEFAULT_IMAGE)
    agenda = db.Column(db.String(300), default="No agenda")
