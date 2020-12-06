from flask import Blueprint, request
from models.user import User
from serializers.user_serializer import UserSchema
from serializers.populated_user import PopulatedUserSchema
from middleware.secure_route import secure_route
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail




user_schema = UserSchema()
populated_user_schema = PopulatedUserSchema()

router = Blueprint(__name__, 'users')


# register user
@router.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()
    user = user_schema.load(request_body)
    user.save()
    # send(user)
    return user_schema.jsonify(user), 200



# user verification by email 
def send(user):
  base_URL = 'http://localhost:8001'
  message = Mail(from_email = "whprojectapp2020@gmail.com",
    to_emails = user.email,
    subject = "Email verificaton from WH",
    html_content = f'<a href="{base_URL}/verification/{user.id}">Please verify your email address</a>'
    )
  try:
    sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
  except Exception as e:
    print(e.message)
 
#verify user
@router.route('/verification/<int:id>',methods=['PUT'])
def confirm(id):
  current_user = User.query.get(id)
  if current_user.is_confirmed:
    return f'Email already verified'
  else:
   current_user.is_confirmed = True
   current_user.save()
   return f'Validation has been successful for {current_user.id} user'


# login user
@router.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()
    email = data['email']
    if not user:
        return{'message': 'no user found with this email'}, 200

    if not user.validate_password(data['password']):
        return{'message': 'Unauthorized'}, 402

    token = user.generate_token()

    return{'token': token, 'message': f'Welcome back {email}'}

# Get all users + Favourites


@router.route('/users', methods=['GET'])
@secure_route
def get_users():
    users = User.query.all()
    return populated_user_schema.jsonify(users, many=True), 200

# get single user + Favourites


@router.route('/users/<int:id>', methods=['GET'])
@secure_route
def get_single_site(id):
    user = User.query.get(id)

    if not user:
        return {'message': 'User not found'}, 404

    return populated_user_schema.jsonify(user), 200


