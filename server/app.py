import os

from flask import Blueprint, Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_login import LoginManager, current_user, login_required, logout_user
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import CandidateModel, VotesModel, db
from dotenv import load_dotenv
from auth import auth

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

api_bp = Blueprint('api', __name__, url_prefix='/api')

api = Api(api_bp)

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = "login"


@app.errorhandler(404)
def not_found(error):
    return render_template("index.html")


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

app.register_blueprint(api_bp)
app.register_blueprint(auth)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
