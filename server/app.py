import os

from dotenv import load_dotenv
from flask import Blueprint, Flask, jsonify, render_template, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import(LoginManager, current_user, login_required,
                         login_user, logout_user)
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import CandidateModel, UserModel, VotesModel, db

# from auth import auth_bp

load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../frontend/dist',
    template_folder='../frontend/dist'
)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///instance/app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


migrate = Migrate(app, db)

db.init_app(app)
CORS(app)
bcrypt = Bcrypt(app)

api_bp = Blueprint('api', __name__, url_prefix='/api')

api = Api(api_bp)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return UserModel.query.get(int(user_id))


@app.errorhandler(404)
def not_found(self):  # pylint: disable=unused-argument
    return render_template("index.html")

class UserResource(Resource):
    def get(self, num):
        user = UserModel.query.filter(UserModel.id == num).first()

        if user:
            return {
                "national_id": user.national_id,
                "name": user.name,
                "email": user.email,
            }, 200
        
        return {
            "message":"User doesn't exist"
        }, 404


api.add_resource(UserResource, '/user/<int:num>')


class Profile(Resource):
    @login_required
    def get(self):
        prez = CandidateModel.query.filter_by(
            CandidateModel.position == "President").all()
        vice = CandidateModel.query.filter_by(
            CandidateModel.position == "Vice-President").all()
        voter = VotesModel.query.filter(
            VotesModel.voter_id == current_user.national_id).first()

        response_body = {
            "name": current_user.name,
            "prez": prez,
            'vice': vice,
            'voter': voter
        }

        return response_body, 200

    @login_required
    def post(self):
        president = request.form.get('president')
        vice_prez = request.form.get('vice-president')

        voted = VotesModel.query.filter(
            VotesModel.voter_id == current_user.national_id).first()

        if not voted:
            vote = VotesModel(
                voter=current_user.national_id,
                president=int(president),
                vice_pres=int(vice_prez)
            )

            db.session.add(vote)
            db.session.commit()

            return jsonify(
                success=True,
                message="Vote submitted successfully"
            )

        return jsonify(
            success=False,
            message='You have already voted'
        )


api.add_resource(Profile, '/profile')


class Candidate(Resource):
    def get(self):
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
    @login_required
    def get(self):
        if current_user.admin != 1:
            logout_user()
            return jsonify(
                success=False,
                message='You do not have required authorization',
            )
        return jsonify(
            success=True,
            message='Login Successful',
            admin=True
        )


api.add_resource(CandidateRegister, '/candidate_register')


class LoginResource(Resource):
    def post(self):
        data = request.get_json()

        email = data['email']
        password = data['password']
        remember = data['remember']

        user = UserModel.query.filter(UserModel.email == email).first()

        if not user:
            return{"message": "User doesn't exist"}, 400

        if not bcrypt.check_password_hash(user.password, password):
            return {'message': 'Invalid password.'}, 400

        login_user(user, remember=remember)
        return {'message': 'Login successful'}, 200


api.add_resource(LoginResource, '/login')


class LogoutResource(Resource):
    @login_required
    def get(self):
        logout_user()
        return {'message': 'Logged out successfully'}, 200


api.add_resource(LogoutResource, '/logout')


class RegisterResource(Resource):
    def post(self):
        data = request.get_json()

        nat_id = data['nat_id']
        email = data['email']
        name = data['name']
        password1 = data['password1']

        existing_user_nat_id = UserModel.query.filter_by(national_id=nat_id).first()
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

        hashed_password = bcrypt.generate_password_hash(password1, rounds=12)

        new_user = UserModel(
            national_id=nat_id,
            email=email,
            name=name,
            password=hashed_password,
        )

        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User successfully registered'}, 201


api.add_resource(RegisterResource, '/sign-up')

app.register_blueprint(api_bp)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
