
import pprint
from googlemaps import Client as googlemaps
from environment.config import Google_API

# import googlemaps
import time
# from GoogleMapsAPIKey import get_my_key

# Define our API Key
# API_KEY = get_my_key()

# Define our Client
gmaps = googlemaps.Client(key='Google_API')

#Define our Search
text_result = gmaps.find_place(
    'Alhambra, Generalife and Albayzín, Granada', open_now=False)
# input_type=
pprint.pprint(text_result)

# https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=YOUR_API_KEY