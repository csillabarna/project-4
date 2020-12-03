from app import db
from models.base import BaseModel


class Site(db.Model, BaseModel):

    __tablename__ = 'sites'

    name = db.Column(db.String(140), nullable=False, unique=True)
    description = db.Column(
        db.String(1000), nullable=False, unique=False)
    province = db.Column(db.String(200), nullable=False, unique=False)
    region = db.Column(db.String(200), nullable=False, unique=False)
    country = db.Column(db.String(200), nullable=False, unique=False)
    latitude = db.Column(db.Float, nullable=False, unique=False)
    longitude = db.Column(db.Float, nullable=False, unique=False)
    category = db.Column(db.ARRAY(db.String), nullable=False, unique=False)
    thumbnail_id = db.Column(db.String(1000), nullable=False, unique=False)
    image = db.Column(db.String(1000), nullable=True, unique=False)
    weblink = db.Column(db.String(1000), nullable=False, unique=False)
    date_inscribed = db.Column(db.Integer, nullable=False, unique=False)
