from db.config import remote_mongodb

# setup database
db = remote_mongodb()


# faculties collection in MongoDB database
def get_faculties_collection():
    return db.get_collection("faculties")


# societies collection in MongoDB database
def get_societies_collection():
    return db.get_collection("societies")


# events collection in MongoDB database
def get_events_collection():
    return db.get_collection("events")


# users collection in MongoDB database
def get_users_collection():
    return db.get_collection("users")
