from app import db
from models.base import BaseModel
from models.user import User
from models.site import Site


class Favourites(db.Model, BaseModel):

  __tablename__ = 'favourites'

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  site_id = db.Column(db.Integer, db.ForeignKey(
      'sites.id'), nullable=False, unique=True)

  user = db.relationship('User', backref='favourites')
  site = db.relationship('Site', backref='favourites')
