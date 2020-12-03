
from flask import Flask
from environment.config import db_URI
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)
# from controllers import sites, users_controller   # nopep8

# app.register_blueprint(sites.router, url_prefix="/api")
# app.register_blueprint(users_controller.router, url_prefix="/api")
