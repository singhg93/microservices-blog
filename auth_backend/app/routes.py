from flask.views import MethodView
from flask import (
    jsonify,
    request
)
from .schemas import validate_user
from .models import User, db
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies,
    get_csrf_token, fresh_jwt_required
)

jwt = JWTManager()

class Register(MethodView):
    ''' endpoint to register users '''

    def post(self):
        '''
        POST request processing:
        get the request data, validate it,
        add the user to the database
        '''

        data = validate_user(request.get_json())

        if data['ok']:
            # get the valid data for the new user
            user_data = data['user_data']

            # check to see if a user with the given email already exits
            if User.query.filter_by(email=user_data['email']).first() is not None:
                return jsonify({'ok': False, 'message': 'User already exists'}), 400

            new_user = User(email=user_data['email'], password=user_data['password'])

            # add the user to the database
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'ok': True, 'message': "user created"}), 200

        else:
            return jsonify({'ok': False, 'message': "credentials do not meet specifications"}), 400


class Login(MethodView):
    ''' Login endpoint '''

    def post(self):
        '''
        get the user credentials from the request
        verify the credentials, generate the access and refresh token,
        set the tokens in the cookies
        return the response
        '''

        data = validate_user(request.get_json())
        
        if data['ok']:

            user_data = data['user_data']

            user = User.query.filter_by(email=user_data['email']).first()

            # verify the user credentials
            if user is None or not user.verify_password(user_data['password']):
                return jsonify({"ok": False, "message": "Invalid Credentials"}), 401

            del user_data['password']

            access_token = create_access_token(identity=user_data, fresh=True)
            refresh_token = create_refresh_token(identity=user_data)

            # set the tokens in cookies
            response = jsonify({
                "ok": True,
                "message": "Login Successful",
                "access_csrf": get_csrf_token(access_token),
                "refresh_csrf": get_csrf_token(refresh_token)
            })
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response, 200

        else:
            return jsonify({"ok": False, "message": "Invalid Credentials"}), 401

class FreshLogin(MethodView):
    ''' Fresh Login endpoint '''

    def post(self):
        '''
        get the user credentials from the request
        verify the credentials, generate the access token,
        set the token in the cookies
        return the response
        '''

        data = validate_user(request.get_json())
        
        if data['ok']:

            user_data = data['user_data']

            user = User.query.filter_by(email=user_data['email']).first()

            # verify the user credentials
            if user is None or not user.verify_password(user_data['password']):
                return jsonify({"ok": False, "message": "Invalid Credentials"}), 401

            del user_data['password']

            access_token = create_access_token(identity=user_data, fresh=True)

            # set the tokens in cookies
            response = jsonify({
                "ok": True,
                "message": "Login Successful",
                "access_csrf": get_csrf_token(access_token),
            })
            set_access_cookies(response, access_token)

            return response, 200

        else:
            return jsonify({"ok": False, "message": "Invalid Credentials"}), 401

class RefreshToken(MethodView):
    ''' Token refresh endpoint '''

    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user, fresh=False)

        response = jsonify({
            "ok": True,
            "access_csrf": get_csrf_token(access_token)
        })
        set_access_cookies(response, access_token)
        return response, 200

class Logout(MethodView):
    ''' Logout endpoint '''

    def post(self):
        '''
        Remove the tokens from the cookies
        '''
        response = jsonify({"ok": True, "message": "Logout successful"})
        unset_jwt_cookies(response)
        return response, 200

class ValidateToken(MethodView):

    @jwt_required
    def get(self):
        user_data = get_jwt_identity()
        return jsonify({"ok": True, "logged_in_as": user_data['email']}), 200

class ValidateFreshToken(MethodView):

    @fresh_jwt_required
    def get(self):
        user_data = get_jwt_identity()
        return jsonify({"ok": True, "logged_in_as": user_data['email']}), 200

class GetUser(MethodView):
    def get(self):
        user = User.query.all()
        if user:
            return jsonify({'user': user[0].email}), 200
        else:
            return jsonify({'ok': False, 'messsage': 'User not found'}), 404
