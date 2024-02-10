from typing import List
from pydantic import BaseModel, Field


# user model
class User(BaseModel):
    firstName: str
    username: str
    lastName: str
    interests: List[str]


# event model
class Event(BaseModel):
    name: str
    society: str
    date: str
    hashtags: List[str]
