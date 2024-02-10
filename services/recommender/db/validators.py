# NOTE
# This file is not necessary

from pydantic import BaseModel


class User(BaseModel):
    user_id: str


class Event(BaseModel):
    event_id: str
