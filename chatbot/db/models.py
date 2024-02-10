# TODO
# add venue and other attributes later

from pydantic import BaseModel


# user input model
class Input(BaseModel):
    content: str
    username: str


# event model
class Event(BaseModel):
    name: str
    society: str
    description: str


# user model
class User(BaseModel):
    username: str
    firstName: str
    lastName: str
    faculty: str
    intake: int


# society model
class Society(BaseModel):
    societyName: str
    description: str
