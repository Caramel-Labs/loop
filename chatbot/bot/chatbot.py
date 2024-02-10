from langchain.llms import Cohere
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
import os
from dotenv import load_dotenv
from db.collections import (
    get_faculties_collection,
    get_societies_collection,
    get_events_collection,
    get_users_collection,
)
from db.schemas import event_list_serial, society_list_serial, user_individual_serial

# get collections from database
faculties_collection = get_faculties_collection()
societies_collection = get_societies_collection()
events_collection = get_events_collection()
user_collection = get_users_collection()

# loading Cohere API key
load_dotenv()
os.environ["COHERE_API_KEY"] = os.getenv("COHERE_API_KEY")

# configuring LLM settings
llm = Cohere(model="command-xlarge-nightly", temperature=0.5, max_tokens=800, k=0, p=1)


# get simple response to test connection with LLM
def get_simple_response():
    global llm

    prompt = """Generate me a list of travel destination in the tropics. Start with
    1. Jamaica
    2. Sri Lanka
    3. Hawaii
    """

    return llm(prompt)


# create prompt and send to chatbot and get response
def loop_chat(message, username):
    global events_collection, llm

    # get all events from database
    events = event_list_serial(events_collection.find())

    # generate string with event info for all events
    event_info = ""
    for event in events:
        event_info += f"Event name: {event.get('name')}\nOrganized by: {event.get('society')}\nEvent description: {event.get('description')}\n\n"

    # get all societies from database
    societies = society_list_serial(societies_collection.find())

    # generate string with society info for all societies
    society_info = ""
    for society in societies:
        society_info += f"Society name: {society.get('societyName')}\nSociety description: {society.get('description')}\n\n"

    # get user info from database
    user = user_individual_serial(user_collection.find_one({"username": username}))
    first_name = user["firstName"]
    faculty = user["faculty"]

    prompt_template = PromptTemplate.from_template(
        """You are an AI chatbot who knows information about some events and the societies that are organizing them.
Here is what you know:

{events}
{societies}
The user's name is {first_name}. They are a student of the {faculty} at KDU.
The user asks you the following question:

{message}

Do not offer to help the user further.
Simply answer the user's question.

Your response:"""
    )

    prompt = prompt_template.format(
        events=event_info,
        societies=society_info,
        first_name=first_name,
        faculty=faculty,
        message=message,
    )
    print(prompt)

    output = llm(prompt)
    return output
