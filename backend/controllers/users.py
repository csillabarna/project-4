from flask import Blueprint, request, g
from models.user import User
from serializers.user_serializer import UserSchema
from serializers.populated_user import PopulatedUserSchema
from middleware.secure_route import secure_route
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from marshmallow import ValidationError
from email_validator import validate_email, EmailNotValidError
from sqlalchemy import exc


user_schema = UserSchema()
populated_user_schema = PopulatedUserSchema()
print(populated_user_schema)
router = Blueprint(__name__, 'users')


# register user
@router.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()
    user = user_schema.load(request_body)
    email = user.email
    try:
      valid = validate_email(email)
      email = valid.email
      # user verification by email 
      def send(user):
        base_URL = 'https://know-your-heritage.herokuapp.com'
        message = Mail(from_email = "whprojectapp2020@gmail.com",
          to_emails = user.email,
          subject = "Email verification from WH",
          html_content = f'<a href="{base_URL}/verification/{user.id}">Please click here to verify your email address</a>'
          )
        try:
          sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])
          response = sg.send(message)
          print(response.status_code)
          print(response.body)
          print(response.headers)
        except Exception as e:
          print(str(e), message)
    except EmailNotValidError as e:
      print(str(e))
      return str(e)
    try: 
      user.save()
    except exc.IntegrityError as e:
      return str(e.orig.args), 409
    send(user)
    return user_schema.jsonify(user), 200




 
#verify user
@router.route('/verification/<int:id>',methods=['PUT'])
def confirm(id):
  current_user = User.query.get(id)
  print(current_user)

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
    #for email verification 
    if not user.is_confirmed:
        return {'message': 'Please validate your email address'}, 402
    token = user.generate_token()

    return{'token': token, 'message': f'Welcome back {email}'}


#edit user
@router.route('/users/<int:id>', methods=['PUT'])
@secure_route
def edit_user(id):
    existing_user = User.query.get(id)
    user_id = User.query.get(id).id
    current_user_id = g.current_user.id
    try:
        user = user_schema.load(
            request.get_json(),
            instance=existing_user,
            partial=True
        )
    except ValidationError as e:
        return {'errors': e.messages, 'message': 'Something went wrong.'}
    # added object level prem, means check who wants to edit the site
    if user_id != current_user_id:
        return {'message': 'Unauthorized'}, 401

    user.save()

    return user_schema.jsonify(user), 201


#delete user
@router.route('/users/<int:id>', methods=['DELETE'])
@secure_route
def remove(id):
    user = User.query.get(id)
    user_id = User.query.get(id).id
    current_user_id = g.current_user.id
    if user_id != current_user_id:
        return {'message': 'Unauthorized'}, 401
    user.remove()
    return {'message': f'user {id} has been deleted successfully'}




# Get all users + Favourites
@router.route('/users', methods=['GET'])
@secure_route
def get_users():
    users = User.query.all()
    return populated_user_schema.jsonify(users, many=True), 200



# get single user + Favourites
@router.route('/users/<int:id>', methods=['GET'])
def get_single_site(id):
    user = User.query.get(id)
    if not user:
        return {'message': 'User not found'}, 404

    return populated_user_schema.jsonify(user), 200


