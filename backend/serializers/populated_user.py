from app import ma
from serializers.base_serializer import BaseSchema
from serializers.favourites_serializer import FavouritesSchema
from marshmallow import fields
from models.user import User


class PopulatedUserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('user_id',)

  site_id = fields.Integer()

  favourites = fields.Nested('FavouritesSchema', many=True)
  user = fields.Nested('UserSchema', only=('id', 'username'))
