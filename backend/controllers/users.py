from flask import Blueprint, request
from models.user import User
from serializers.user_serializer import UserSchema


user_schema = UserSchema()

router = Blueprint(__name__, 'users')
# register user
@router.route('/signup', methods=['POST'])
def signup():
  request_body = request.get_json()
  user = user_schema.load(request_body)
  user.save()
  return user_schema.jsonify(user), 200

#login user
@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()

  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return{'message': 'no user found with this email'},200

  if not user.validate_password(data['password']):
    return{'message': 'Unauthorized'}, 402

  token = user.generate_token()

  return{'token': token, 'message': 'Welcome back'}


