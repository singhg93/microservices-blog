from flask.views import MethodView
from flask import (
    jsonify,
    request
)
from .schemas import validate_user
from .models import User, db

class Register(MethodView):
    ''' endpoint to register users '''

    def get(self):
        ''' get request not allowed '''
        return jsonify({'ok': False, 'message': "forbidden"}), 403

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
            return jsonify({'ok': False, 'message': "internal error"}), 400


class GetUser(MethodView):
    def get(self, username):
        user = User.query.filter_by(email=username).first()
        if user is not None:
            return jsonify({'user': user.email}), 200
        else:
            return jsonify({'ok': False, 'messsage': 'User not found'}), 404
