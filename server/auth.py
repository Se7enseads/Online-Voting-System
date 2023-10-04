from flask import request
# from werkzeug.security import check_password_hash, generate_password_hash
from flask_bcrypt import Bcrypt
from flask_login import login_user, login_required, logout_user
from models import UserModel, db
from flask_restful import Api, Resource
from app import bcrypt, login_manager, app, auth_bp

# auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

api = Api(auth_bp)
bcrypt = Bcrypt(app)


@login_manager.user_loader
def load_user(user_id):
    return UserModel.query.get(int(user_id))
    
class LoginResource(Resource):
    def post(self):
        data = request.get_json()

        email = data['email']
        password = data['password']
        remember = data['remember', False]

        user = UserModel.query.filter(UserModel.email == email).first()

        if not user or password != user.password:
            return {'message': 'Invalid credentials'}, 401

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
    def get(self):
        return 'hello', 200
    def post(self):
        data = request.get_json()

        nat_id = data['nat_id']
        email = data['email']
        name = data['name']
        password1 = data['password1']
        password2 = data['password2']

        if password1 != password2:
            return {
                "message": 'Passwords does not match. Please try again.',
                "success": False
            }, 401

        new_user = UserModel(
            national_id=nat_id,
            email=email,
            name=name,
            password=bcrypt.generate_password_hash(password1),
            admin=1
        )

        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User successfully registered'}, 201


api.add_resource(RegisterResource, '/sign-up')

app.register_blueprint(auth_bp)

