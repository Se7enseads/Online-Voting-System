"""
Database Models for the Voting App.

This module defines the SQLAlchemy models for the Online Voting App database.
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = "/images/default.jpg"


class UserModel(db.Model):
    """
    UserModel represents the user information in the database.

    Attributes:
        id (int): The unique identifier for the user.
        national_id (int): The national ID of the user (unique).
        name (str): The name of the user.
        email (str): The email address of the user (unique).
        password (str): The password hash of the user.
        admin (str): The admin status of the user (default is '0' for non-admin).

    Relationships:
        votes (relationship): One-to-many relationship with VotesModel representing user's votes.
    """
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    admin = db.Column(db.String(), default=0)

    votes = db.relationship('VotesModel', back_populates='user')


class VotesModel(db.Model):
    """
    VotesModel represents the user's votes in the database.

    Attributes:
        id (int): The unique identifier for the vote.
        voter_id (int): The national ID of the user who voted (foreign key).
        president (int): The candidate number for the president.
        vice_pres (int): The candidate number for the vice-president.

    Relationships:
        user (relationship): Many-to-one relationship with UserModel representing the user.
    """
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    voter_id = db.Column(db.Integer, db.ForeignKey(
        'users.national_id'), nullable=False, unique=True)
    president = db.Column(db.Integer, nullable=False)
    vice_pres = db.Column(db.Integer, nullable=False)

    user = db.relationship('UserModel', back_populates='votes')


class CandidateModel(db.Model):
    """
    CandidateModel represents the candidate information in the database.

    Attributes:
        id (int): The unique identifier for the candidate.
        candidate_num (int): The unique candidate number.
        first_name (str): The first name of the candidate.
        last_name (str): The last name of the candidate.
        certificate (str): The certificate information of the candidate.
        position (str): The position for which the candidate is running.
        pic_path (str): The path to the candidate's picture (default is DEFAULT_IMAGE).
        agenda (str): The agenda or platform of the candidate (default is "No agenda").

    """
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    candidate_num = db.Column(db.Integer, nullable=False, unique=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80))
    certificate = db.Column(db.String(120), nullable=False)
    position = db.Column(db.String(80), nullable=False)
    pic_path = db.Column(db.String(120), default=DEFAULT_IMAGE)
    agenda = db.Column(db.String(300), default="No agenda")
