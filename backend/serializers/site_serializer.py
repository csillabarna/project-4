from app import ma
from serializers.base_serializer import BaseSchema
from marshmallow import fields
from models.site import Site


class SiteSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Site
    load_instance = True
    load_only = ('user_id',)

  user_id = fields.Integer()

  user = fields.Nested('UserSchema', only=('id', 'username'))
