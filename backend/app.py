"""
Voting App Server

This script creates the Flask application for the Voting App, 
configures it, and defines various routes and resources.

The server interacts with a PostgreSQL database to 
manage user accounts, candidate registration, and voting.

Usage: Run this script to start the Voting App server.
"""

import os

from dotenv import load_dotenv
from flask import Blueprint, Flask, render_template, request
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)
from flask_migrate import Migrate
from flask_restful import Api, Resource
from passlib.context import CryptContext

from models import CandidateModel, UserModel, VotesModel, db

load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../frontend/dist',
    template_folder='../frontend/dist'
)

if os.getenv('DATABASE_URI') is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///instance/app.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')


migrate = Migrate(app, db)

db.init_app(app)
CORS(app)
jwt = JWTManager(app)
pwd_context = CryptContext(schemes=["sha256_crypt"])

api_bp = Blueprint('api', __name__, url_prefix='/api')

api = Api(api_bp)


@app.errorhandler(404)
def not_found(self):  # pylint: disable=unused-argument
    """
    Handle 404 Not Found errors by rendering the index.html template.

    :param self: Flask app instance
    :return: Rendered HTML template
    """
    return render_template("index.html")


class Profile(Resource):
    """
    Resource class for handling user profiles and votes.
    """

    @jwt_required()
    def get(self):
        """
        Get user profile information and vote status.

        :return: JSON response with user profile data
        """

        prez = CandidateModel.query.filter(
            CandidateModel.position == "President").all()
        vice = CandidateModel.query.filter(
            CandidateModel.position == "Vice-President").all()

        user = UserModel.query.filter(
            UserModel.email == get_jwt_identity()).first()

        voter = VotesModel.query.filter(
            VotesModel.voter_id == user.national_id).first()

        voter_exists = voter is not None

        admin = user.admin.lower() == "true"

        response_body = {
            "prez": [
                {
                    "id": prez_can.id,
                    "candidate_num": prez_can.candidate_num,
                    "first_name": prez_can.first_name,
                    "last_name": prez_can.last_name,
                    "certificate": prez_can.certificate,
                    "position": prez_can.position,
                    "pic_path": prez_can.pic_path,
                    "agenda": prez_can.agenda
                } for prez_can in prez
            ],
            "vice": [
                {
                    "id": vice_can.id,
                    "candidate_num": vice_can.candidate_num,
                    "first_name": vice_can.first_name,
                    "last_name": vice_can.last_name,
                    "certificate": vice_can.certificate,
                    "position": vice_can.position,
                    "pic_path": vice_can.pic_path,
                    "agenda": vice_can.agenda
                } for vice_can in vice
            ],
            "name": user.name,
            "voter": voter_exists,
            "admin": admin
        }

        return response_body, 200

    @jwt_required()
    def post(self):
        """
        Handle user vote submission.

        :return: JSON response indicating the vote submission status
        """
        data = request.get_json()

        president = data['president']
        vice_prez = data['vicePresident']

        user = UserModel.query.filter(
            UserModel.email == get_jwt_identity()).first()

        voted = VotesModel.query.filter(
            VotesModel.voter_id == user.national_id).first()

        if not voted:
            vote = VotesModel(
                voter_id=user.national_id,
                president=president,
                vice_pres=vice_prez
            )

            db.session.add(vote)
            db.session.commit()

            return {
                "message": "Vote submitted successfully"
            }, 200

        return {
            "message": 'You have already voted'
        }, 404


api.add_resource(Profile, '/profile')


class Candidate(Resource):
    """
    Resource class for handling candidate information.
    """

    def get(self):
        """
        Get candidate information.

        :return: JSON response with candidate data
        """
        prez = CandidateModel.query.filter(
            CandidateModel.position == "President").all()
        vice = CandidateModel.query.filter(
            CandidateModel.position == "Vice-President").all()

        response_body = {
            "prez": [
                {
                    "id": prez_can.id,
                    "candidate_num": prez_can.candidate_num,
                    "first_name": prez_can.first_name,
                    "last_name": prez_can.last_name,
                    "certificate": prez_can.certificate,
                    "position": prez_can.position,
                    "pic_path": prez_can.pic_path,
                    "agenda": prez_can.agenda
                } for prez_can in prez
            ],
            "vice": [
                {
                    "id": vice_can.id,
                    "candidate_num": vice_can.candidate_num,
                    "first_name": vice_can.first_name,
                    "last_name": vice_can.last_name,
                    "certificate": vice_can.certificate,
                    "position": vice_can.position,
                    "pic_path": vice_can.pic_path,
                    "agenda": vice_can.agenda
                } for vice_can in vice
            ]
        }

        return response_body, 200


api.add_resource(Candidate, '/candidate')


class CandidateRegister(Resource):
    """
    Resource class for handling candidate registration.
    """

    @jwt_required()
    def post(self):
        """
        Handle candidate registration.

        :return: JSON response indicating the registration status
        """
        data = request.get_json()

        candidate_num = data["candidate_num"]

        candidate = CandidateModel.query.filter(
            CandidateModel.candidate_num == candidate_num).first()

        if candidate:
            return {"message": "Candidate Number exists"}, 400

        new_candidate = CandidateModel(
            candidate_num=data["candidate_num"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            certificate=data["certificate"],
            position=data["position"],
            pic_path=data["pic_path"],
            agenda=data["agenda"]
        )

        db.session.add(new_candidate)
        db.session.commit()

        return {
            "message": "Candidate registered successfully"
        }, 201


api.add_resource(CandidateRegister, '/candidate_register')


class LoginResource(Resource):
    """
    Resource class for handling user login.
    """

    def post(self):
        """
        Handle user login.

        :return: JSON response with an access token and login status
        """
        data = request.get_json()

        email = data['email']
        password = data['password']

        user = UserModel.query.filter(UserModel.email == email).first()

        if not user:
            return {"message": "User doesn't exist"}, 400

        if not pwd_context.verify(password, user.password):
            return {'message': 'Invalid password.'}, 400

        access_token = create_access_token(identity=email)
        return {'access_token': access_token, 'message': 'User Successfully logged in.'}, 200


api.add_resource(LoginResource, '/login')


class RegisterResource(Resource):
    """
    Resource class for handling user registration.
    """

    def post(self):
        """
        Handle user registration.

        :return: JSON response indicating the registration status
        """
        data = request.get_json()

        nat_id = data['nat_id']
        email = data['email']
        name = data['name']
        password1 = data['password1']

        existing_user_nat_id = UserModel.query.filter_by(
            national_id=nat_id).first()
        existing_user_email = UserModel.query.filter_by(email=email).first()

        if existing_user_nat_id and existing_user_email:
            return {
                "message": 'National ID and email already registered.',
            }, 400
        if existing_user_nat_id:
            return {
                "message": 'National ID already registered.',
            }, 400
        if existing_user_email:
            return {
                "message": 'Email already registered.',
            }, 400

        hashed_password = pwd_context.hash(password1)

        admin_flag = bool('admin' in name.lower())

        new_user = UserModel(
            national_id=nat_id,
            email=email,
            name=name,
            password=hashed_password,
            admin=admin_flag
        )

        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User successfully registered'}, 201


api.add_resource(RegisterResource, '/sign-up')


class Votes(Resource):
    """
    Resource class for handling vote information.
    """

    def get(self):
        """
        Get vote information.

        :return: JSON response with vote data
        """
        prez = CandidateModel.query.filter(
            CandidateModel.position == "President").all()
        vice = CandidateModel.query.filter(
            CandidateModel.position == "Vice-President").all()
        labels = []
        data = []
        labels1 = []
        data1 = []
        for candidate in prez:
            name = candidate.first_name+" "+candidate.last_name
            labels.append(name)

            vote = VotesModel.query.filter(
                VotesModel.president == candidate.candidate_num).count()
            data.append(vote)

        for candidate in vice:
            name = candidate.first_name+" "+candidate.last_name
            labels1.append(name)

            vote = VotesModel.query.filter(
                VotesModel.vice_pres == candidate.candidate_num).count()
            data1.append(vote)

        response = {
            "data": data,
            "labels": labels,
            "data1": data1,
            "labels1": labels1
        }

        return response, 200


api.add_resource(Votes, '/votes')


app.register_blueprint(api_bp)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
