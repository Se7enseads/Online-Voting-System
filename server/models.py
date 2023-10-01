from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.orm import validates
from flask_login import UserMixin

db = SQLAlchemy()

class UserModel(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True,)
    roll_num = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    admin = db.Column(db.Integer, default=0)

    votes = db.relationship('VotesModel', back_populates='user')

    def __repr__(self):
        return f"User('{self.name}', '{self.roll_num}')"


class VotesModel(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    roll_num = db.Column(db.Integer, nullable=False, unique=True)
    voter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    president = db.Column(db.Integer, nullable=False)
    vice_pres = db.Column(db.Integer, nullable=False)

    user = db.relationship('UserModel', back_populates='votes')

    def __repr__(self):
        return f"Voter('{self.roll_num}')"


class CandidateModel(db.Model):
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    candidate_num = db.Column(db.Integer, nullable=False, unique=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80))
    certificate = db.Column(db.String(120), nullable=False)
    position = db.Column(db.String(80), nullable=False)
    pic_path = db.Column(db.String(120), default='images/default.png')
    agenda = db.Column(db.String(300), default="No agenda")

    def __repr__(self):
        return f"Candidate('{self.first_name}','{self.batch}','{self.course}','{self.department}')"
