from app import ma
from serializers.base_serializer import BaseSchema
from marshmallow import fields
from models.favourites import Favourites


class FavouritesSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Favourites
    load_instance = True
    # load_only = ('id',)
  user_id = fields.Integer()
  # user = fields.Nested('UserSchema', only=('id',))

  site_id = fields.Integer()
  # site = fields.Nested('SiteSchema', only=('id',))
  site = fields.Nested('SiteSchema', only=('thumbnail_id', 'name', 'country'))
