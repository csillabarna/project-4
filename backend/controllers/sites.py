from flask import Blueprint, request, g
from marshmallow import ValidationError

from models.site import Site
from serializers.site_serializer import SiteSchema
from serializers.populated_site import PopulatedSiteSchema


from middleware.secure_route import secure_route 


site_schema = SiteSchema()
populated_site = PopulatedSiteSchema()



router = Blueprint(__name__, 'sites')


# get all site
@router.route('/sites', methods=['GET'])
def index():
    sites = Site.query.all()
    return site_schema.jsonify(sites, many=True), 200


# get single site
@router.route('/sites/<int:id>', methods=['GET'])
def get_single_site(id):
    site = Site.query.get(id)

    if not site:
        return {'message': 'Site not found'}, 404

  
    return populated_site.jsonify(site), 200


# add site
@router.route('/sites', methods=['POST'])
@secure_route
def create():
    site_dictionary = request.get_json()
    # current user id 
    site_dictionary['user_id'] = g.current_user.id
    try:
      site = site_schema.load(site_dictionary)
    except ValidationError as e:
      return {'errors': e.messages, 'message': f'{e}Something went wrong.'}

    site.save()
    return site_schema.jsonify(site), 200

# edit site
@router.route('/sites/<int:id>', methods=['PUT'])
@secure_route
def edit_site(id):
  existing_site = Site.query.get(id)

  try:
    site = site_schema.load(
      request.get_json(),
      instance=existing_site,
      partial=True
    )
  except ValidationError as e:
     return { 'errors': e.messages, 'message': 'Something went wrong.' }

  #added object level prem, means check who wants to edit the site
  if site.user != g.current_user:
    return {'message':'Unauthorized'}, 401

  site.save()

  return site_schema.jsonify(site), 201

# delete site
@router.route('/sites/<int:id>', methods=['DELETE'])
@secure_route
def remove(id):
    site = Site.query.get(id)

    site.remove()
    return {'message': f'site {id} has been deleted successfully'}




    


