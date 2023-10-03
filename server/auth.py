from flask import Blueprint, request
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_user, login_required, logout_user
from models import UserModel, db
from flask_restful import Api, Resource

auth = Blueprint('auth', __name__, url_prefix='/auth')
api = Api(auth)

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        remember = data.get('remember', False)

        user = UserModel.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
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
    def post(self):
        data = request.get_json()

        nat_id = data['national_id']
        email = data['email']
        name = data['name']
        password1 = data['password1']
        password2 = data['password2']

        if password1 != password2:  # if passwords do not match, redirect
            return {
                "message": 'Passwords do not match. Please try again.',
                "success": False
            }, 401

        new_user = UserModel(
            national_id=nat_id,
            email=email,
            name=name,
            password=generate_password_hash(password1, method='sha256'),
            admin=1
        )

        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User successfully registered'}, 201


api.add_resource(RegisterResource, '/register')
