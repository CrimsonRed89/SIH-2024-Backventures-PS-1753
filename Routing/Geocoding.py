import requests
import json

API_KEY = "AIzaSyDj3vJGnYx52KENC7svMfzp2O56Uty2fr8"

def get_coordinates_from_pincode(pincode):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={pincode},India&key={API_KEY}"
    response = requests.get(url).json()
    if response['status'] == 'OK':
        location = response['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    return None, None

pincode_list = ["110010", "282001", "721454"]
coordinates = {}

for pincode in pincode_list:
    lat, lng = get_coordinates_from_pincode(pincode)
    coordinates[pincode] = {"state": "Unknown", "post_office": "Unknown", "coords": [lat, lng]}

with open("pincodes_with_coords.json", "w") as f:
    json.dump(coordinates, f, indent=4)

print("Coordinates saved!")
