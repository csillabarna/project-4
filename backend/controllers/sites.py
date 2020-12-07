from flask import Blueprint, request, g

from models.site import Site
from models.comment import Comment
from models.favourites import Favourites
from serializers.site_serializer import SiteSchema
from serializers.populated_site import PopulatedSiteSchema
from serializers.comment_serializer import CommentSchema
from serializers.favourites_serializer import FavouritesSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError


site_schema = SiteSchema()
populated_site = PopulatedSiteSchema()

comment_schema = CommentSchema()
favourite_schema = FavouritesSchema()

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
    print(site_dictionary)
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
        return {'errors': e.messages, 'message': 'Something went wrong.'}

    # added object level prem, means check who wants to edit the site
    if site.user != g.current_user:
        return {'message': 'Unauthorized'}, 401

    site.save()

    return site_schema.jsonify(site), 201

# delete site


@router.route('/sites/<int:id>', methods=['DELETE'])
@secure_route
def remove(id):
    site = Site.query.get(id)

    site.remove()
    return {'message': f'site {id} has been deleted successfully'}


#  Add comment
@router.route('/sites/<int:site_id>/comments', methods=['POST'])
@secure_route
def comment_create(site_id):

    comment_data = request.get_json()
    comment_data['user_id'] = g.current_user.id

    site = Site.query.get(site_id)

    comment = comment_schema.load(comment_data)
    comment.site = site
    comment.save()
    return comment_schema.jsonify(comment)

#  Edit a comment


@router.route('/comments/<int:comment_id>', methods=['PUT'])
@secure_route
def edit_comment(comment_id):
    existing_comment = Comment.query.get(comment_id)

    try:
        comment = comment_schema.load(
            request.get_json(),
            instance=existing_comment,
            partial=True
        )
    except ValidationError as e:
        return {'errors': e.messages, 'message': 'Something went wrong.'}

    # added object level prem, means check who wants to edit the site
    if comment.user != g.current_user:
        return {'message': 'Unauthorized'}, 401

    comment.save()

    return comment_schema.jsonify(comment), 201

# Delete a comment


@router.route('/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def remove_comment(comment_id):
    comment = Comment.query.get(comment_id)

    comment.remove()
    return {'message': f'comment {comment_id} has been deleted successfully'}

# Get favourites


@router.route('/favourites', methods=['GET'])
def get_favourites():
    favourites = Favourites.query.all()
    return favourite_schema.jsonify(favourites, many=True), 200


# Add Favourites
@router.route('/favourites', methods=['POST'])
@secure_route
def add_favourite():
    favourite_dictionary = request.get_json()
    print(g)
    # current user id
    favourite_dictionary['user_id'] = g.current_user.id
    print(favourite_dictionary['site_id'])
    print(g.current_user)
    print(request)
    try:
        favourite = favourite_schema.load(favourite_dictionary)
    except ValidationError as e:
        return {'errors': e.messages, 'message': f'{e}Something went wrong.'}
    print(favourite.site_id)
    # if not site:
    #     return {'message': 'Site not found'}, 404

    # if favourite['site_id'] != favourite_dictionary['site_id']:
    #     return {'message': 'This site is already in your favourites'}, 401

    favourite.save()
    return favourite_schema.jsonify(favourite), 200

# Remove Favourites


@router.route('/favourites/<int:site_id>', methods=['DELETE'])
@secure_route
def remove_favourite(site_id):
    user_id =g.current_user.id
    favourite = Favourites.query.get((user_id, site_id))
    if not favourite:
        return {'message': 'Site not found in your favourites'}, 404
    favourite.remove()
    return {'message': f'Favourite for user :{user_id}  site id: {site_id } has been deleted successfully'}
