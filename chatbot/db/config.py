from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def remote_mongodb():
    # connection URI for Loop's Atlas cluster
    connection_uri = os.getenv("MONGO_URI_STRING")

    # create MongoDB client using connection URL
    client = MongoClient(connection_uri)

    # send ping to confirm successful connection
    try:
        client.admin.command("ping")
        print("Atlas Cluster pinged.")
        print("You have successfully connected to MongoDB on the cloud!")
    except Exception as e:
        print(e)

    # select database from cluster
    db = client.LoopNew

    return db
