from models import VotesModel, CandidateModel, UserModel,db
from flask import Flask, Blueprint, request, render_template, jsonify
from flask_login import login_required, current_user, logout_user
from flask_restful import Api, Resource

from flask_migrate import Migrate

# load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../frontend/dist',
    template_folder='../frontend/dist'
)

app.config['SQLALCHEMY_DATABASE_URI'] =  "sqlite:///app.db" # os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

api_bp = Blueprint('api', __name__, url_prefix='/api')

api = Api(api_bp)

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = "login"

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


class Profile(Resource):
    @login_required
    def get(self):
        prez = CandidateModel.query.filter_by(post="President").all()
        vice = CandidateModel.query.filter_by(post="Vice-President").all()
        voter = VotesModel.query.filter_by(
            roll_num=current_user.roll_num).first()

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
            VotesModel.roll_num == current_user.roll_num).first()

        if not voted:
            voter = VotesModel(
                roll_num=current_user.roll_num, voter_id=current_user.id,
                president=int(president),
                vice_pres=int(vice_prez)
            )

            db.session.add(voter)
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
            CandidateModel.post == "President").all()
        vice = CandidateModel.query.filter(
            CandidateModel.post == "Vice-President").all()

        response_body = {
            "prez": prez,
            "vice": vice
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
                admin=1
            )
        return jsonify(
            success=True,
            message='Login Successful'
        )


api.add_resource(CandidateRegister, '/candidate_register')

app.register_blueprint(api_bp)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
