from flask import jsonify
from environment.config import Google_API

from app import app, db
import pprint

from models.site import Site
from models.user import User
from models.comment import Comment
from models.favourites import Favourites
from serializers.site_serializer import SiteSchema

import requests
site_schema = SiteSchema()

with app.app_context():

    db.drop_all()

    db.create_all()

    balta = User(
        username="balta",
        email="balta@balta.com",
        password="pass",
        user_bio="I'm a Spanish web developer and love travelling",
        user_city="London",
        user_avatar="https://pbs.twimg.com/profile_images/2624763257/lz5pautt5yimot9nwqow_400x400.png",
        is_confirmed=True
    )

    csilla = User(
        username="csilla",
        email="csilla@csilla.com",
        password="pass",
        user_bio="I'm a Hungarian web developer and love travelling",
        user_city="London",
        user_avatar="https://pbs.twimg.com/profile_images/2624763257/lz5pautt5yimot9nwqow_400x400.png",
        is_confirmed=True
    )

    balta.save()
    csilla.save()
    print('User created')

    resp = requests.get(
        'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&rows=20')
    # &facet=region&facet=states
    heritage_list = resp.json()
    heritage_filtered_records = heritage_list['records']
    result = []
    for x in heritage_filtered_records:
        result.append(heritage_filtered_records)
    result_1 = result[0]
    # pprint.pprint(heritage_filtered_records)

    # def mapper(record):
    #     if not record['fields']['location']:
    #         return {'province': 'not found',
    #                 'region': record['fields']['region'],
    #                 'name': record['fields']['site'],
    #                 'latitude': record['fields']['coordinates'][0],
    #                 'longitude': record['fields']['coordinates'][1],
    #                 'country': record['fields']['states'],
    #                 'description': record['fields']['short_description'],
    #                 'thumbnail_id': record['fields']['image_url']['id'],
    #                 # image=heritage_filtered_dictionary[''],
    #                 'weblink': record['fields']['http_url'],
    #                 'date_inscribed': record['fields']['date_inscribed'],
    #                 'user': balta

    #                 }
    #     else:

    #         return {'region': record['fields']['region'],
    #             'name': record['fields']['site'],
    #             'latitude': record['fields']['coordinates'][0],
    #             'longitude': record['fields']['coordinates'][1],
    #             'country': record['fields']['states'],
    #             'province': record['fields']['location'],
    #             'description': record['fields']['short_description'],
    #             'thumbnail_id': record['fields']['image_url']['id'],
    #             # image=heritage_filtered_dictionary[''],
    #             'weblink': record['fields']['http_url'],
    #             'date_inscribed': record['fields']['date_inscribed'],
    #             'user': balta

    #             }
    def mapper(record):


      return {'region': record['fields']['region'],
                'name': record['fields']['site'],
                'latitude': record['fields']['coordinates'][0],
                'longitude': record['fields']['coordinates'][1],
                'country': record['fields']['states'],
                'province': record['fields'].get(
                  'location'),
                'description': record['fields']['short_description'],
                'thumbnail_id': record['fields']['image_url']['id'],
                # image=heritage_filtered_dictionary[''],
                'weblink': record['fields']['http_url'],
                'date_inscribed': record['fields']['date_inscribed'],
                'user': balta}

    filtered = (list(map(mapper, result_1)))
    print(type(filtered))
    pprint.pprint(filtered)

    def google_id_mapper(record):
        name = record['name']
        resp_1 = requests.get(
            f'https://maps.googleapis.com/maps/api/place/textsearch/json?query={name}&key={Google_API}')
    # &facet=region&facet=states
        google_dict = resp_1.json()
        # print(type(google_list), google_list)
        if not google_dict['results']:
            google_place_id = 'ChIJO7l_l7f8cQ0Rf6IhEu_RjYA'
            record['place_id'] = google_place_id
            return record
            # google_formatted_address = 'not found'
            # record['formatted_address'] = google_formatted_address
            # return record
        else:
            google_place_id = google_dict['results'][0]['place_id']
            record['place_id'] = google_place_id

            # google_result = google_dict['results'][0]
            return record

            # if not google_result['formatted_address']:
            #     google_formatted_address = 'not found'
            #     record['formatted_address'] = google_formatted_address
            #     return record
            # else:
            #     google_formatted_address = google_dict['results'][0]['formatted_address']
            #     record['formatted_address'] = google_formatted_address
            #     return record

    filtered_with_id = (list(map(google_id_mapper, filtered)))
    # pprint.pprint(filtered_with_id)

    def google_photo_mapper(record):
        place_id = record['place_id']
        pprint.pprint(record['place_id'])

        resp_2 = requests.get(
            f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=photo,name,formatted_address,geometry,icon,business_status,vicinity,international_phone_number,opening_hours,website&key={Google_API}')
    # &facet=region&facet=states
        google_dict = resp_2.json()
        pprint.pprint(google_dict)
        if place_id == 'ChIJO7l_l7f8cQ0Rf6IhEu_RjYA':
            record['image'] = ['https://images.unsplash.com/photo-1531944213227-db53a6d0f3bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1941&q=80']
            return record
        else:
            google_photo = google_dict['result']
        # google_photo['photos'] ?
        #     record['image'] =
            record['image'] = google_photo.get(
                'photos', ['https://images.unsplash.com/photo-1531944213227-db53a6d0f3bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1941&q=80'])

            return record

    # https://maps.googleapis.com/maps/api/place/photo?photoreference=PHOTO_REFERENCE&sensor=false&maxheight=MAX_HEIGHT&maxwidth=MAX_WIDTH&key=YOUR_API_KEY

    filtered_with_photo = (list(map(google_photo_mapper, filtered_with_id)))
    pprint.pprint(filtered_with_photo)

    sites_to_make = []
    for site in filtered_with_photo:
        sites_to_make.append(Site(**site))

    # alhambra = Site(
    #     region="Europe and North America",
    #     name="Alhambra, Generalife and Albayzín, Granada",
    #     latitude=37.17667,
    #     longitude=-3.59444,
    #     country="Spain",
    #     province="Province of Granada, Autonomous Community of Andalusia",
    #     description="Rising above the modern lower town, the Alhambra and the Albaycín, situated on two adjacent hills, form the medieval part of Granada. To the east of the Alhambra fortress and residence are the magnificent gardens of the Generalife, the former rural residence of the emirs who ruled this part of Spain in the 13th and 14th centuries. The residential district of the Albaycín is a rich repository of Moorish vernacular architecture, into which the traditional Andalusian architecture blends harmoniously.",
    #     thumbnail_id='9cf243e9fa6b0b572f0a4028e7a8fba7',
    #     image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Alhambradesdegeneralife.jpg/1024px-Alhambradesdegeneralife.jpg',
    #     weblink='https://whc.unesco.org/en/list/314',
    #     date_inscribed=1984,
    #     user=balta

    # )
    # palau = Site(

    #     region="Europe and North America",
    #     name="Palau de la Música Catalana and Hospital de Sant Pau, Barcelona",
    #     latitude=41.38778,
    #     longitude=2.175,
    #     country="Spain",
    #     province="Province of Barcelona, Autonomous Community of Catalonia",
    #     description="These are two of the finest contributions to Barcelona's architecture by the Catalan art nouveau architect Lluís Domènech i Montaner. The Palau de la Música Catalana is an exuberant steel-framed structure full of light and space, and decorated by many of the leading designers of the day. The Hospital de Sant Pau is equally bold in its design and decoration, while at the same time perfectly adapted to the needs of the sick.",
    #     thumbnail_id="9cf243e9fa6b0b572f0a4028e7a8fba7",
    #     image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Alhambradesdegeneralife.jpg/1024px-Alhambradesdegeneralife.jpg',

    #     # image=[{"height":  4618,  "html_attributions":  ["<a href=\"https://maps.google.com/maps/contrib/103094235694394958518\">Diego Simhan</a>"
    #     #                                                  ],  "photo_reference":"ATtYBwKiXNb9LOlWvnsxgRZylNHs6jU3qirT1hYL2USVxZhrWciFUSs6lPKsrYh4MX0ZuuSJmpAoTxYw7omNAL70RSGIzcWBQD-94eWmDH5edcMOk5ueaNk2kh5sjzluijgkWOdxbVxNhq_50O1zA2Nw8ceD6ngNlrcrpKdOK7jFgci4SNrt",  "width":3464}],
    #     weblink="https://whc.unesco.org/en/list/804",
    #     date_inscribed=1997,
    #     user=csilla

    # )

    print('Sites created')

    # comment = Comment(
    #     content='I love this place ',
    #     # rating=5,
    #     user=balta,
    #     site=alhambra
    # )
    # print('Comment created')

    # favourite = Favourites(
    #     user_id=1,
    #     site_id=1
    # )
    # print('Favourites created')
    # print('Favourites created')

    print('Adding to database:')
    # db.session.add(alhambra)
    # pprint.pprint(site_schema.load(sites_to_make))
    # print(type(sites_to_make))
    db.session.add_all(sites_to_make)

    # db.session.add(palau)
    # db.session.add(comment)
    # db.session.add(favourite)

    db.session.commit()
    print('Completed!')
