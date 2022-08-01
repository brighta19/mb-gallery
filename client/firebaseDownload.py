import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from dotenv import load_dotenv
import os
import urllib.request

# load Env
load_dotenv()

# Initialize Firebase
cred = credentials.Certificate(
    "mb-gallery-50105-firebase-adminsdk-9by9y-2fa9dccc5c.json")
firebase_admin.initialize_app(
    cred, {'databaseURL': os.getenv("DATABASE_URL")})

# Get a database reference
ref = db.reference('posts/')
data = ref.get()
keys = ref.get().keys()


def concatName(fullName):
    if ' ' in fullName:
        return str(fullName.split(" ")[0] + "_" + fullName.split(" ")[1])
    else:
        return fullName


# Get the links
for key in keys:
    print(data[key]["image_url"])
    urllib.request.urlretrieve(
        data[key]["image_url"], './downloadedFiles/' + str(concatName(data[key]["author"]) + "_" + concatName(data[key]["description"])) + '.jpeg')
print("Done")
