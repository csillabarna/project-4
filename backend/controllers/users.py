from flask import Blueprint, request
from models.user import User
from serializers.user_serializer import UserSchema
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
import os


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
  email = data['email']
  if not user:
    return{'message': 'no user found with this email'},200

  if not user.validate_password(data['password']):
    return{'message': 'Unauthorized'}, 402

  token = user.generate_token()

  return{'token': token, 'message': f'Welcome back {email}'}




# message = Mail(
#    from_email = "whprojectapp2020@gmail.com",
#    to_emails = "barnacsilla89@gmail.com",
#    subject = "Sending with SendGrid is Fun",
#    content = " easy to do anywhere, even with Python"
#    )
# try:
#   sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))   
#   response = sg.send(message)
#   print(response.status_code)
#   print(response.body)
#   print(response.headers)
# except Exception as e:
#   print(e)

