from app import db
from models.base import BaseModel

from models.site import Site


class Comment(db.Model, BaseModel):

  __tablename__ = 'comments'

  content = db.Column(db.Text, nullable=False)
  # rating = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  site_id = db.Column(db.Integer, db.ForeignKey('sites.id'))

  user = db.relationship('User', backref='comments')
  site = db.relationship('Site', backref='comments')
