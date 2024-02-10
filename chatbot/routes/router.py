from fastapi import APIRouter
from fastapi.responses import JSONResponse
from db.config import remote_mongodb
from bot.chatbot import get_simple_response, loop_chat
from db.models import Input

# setup router
router = APIRouter()


# root
@router.get("/", tags=["ROOT"])
async def root() -> dict:
    return {"message": "Hello World!"}


# all events
@router.get("/events/")
async def events():
    pass


# test chatbot (not necessary in production)
@router.get("/test/")
async def test_chatbot() -> dict:
    message = get_simple_response()
    return {"message": message}


# get response from chatbot
@router.post("/chatbot/")
async def chatbot(input: Input):
    message = input.content
    username = input.username
    response = loop_chat(message=message, username=username)
    return JSONResponse(content={"response": response})
