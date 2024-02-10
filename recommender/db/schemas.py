# Schemas for users


def user_individual_serial(user) -> dict:
    return {
        "id": str(user["_id"]),
        "firstName": user.get("firstName"),
        "username": user.get("username"),
        "lastName": user.get("lastName"),
        "interests": user.get("interests"),
    }


def user_list_serial(users) -> list:
    return (user_individual_serial(user) for user in users)


# Schemas for events


def event_individual_serial(event) -> dict:
    return {
        "id": str(event["_id"]),
        "name": event.get("name"),
        "society": event.get("society"),
        "date": event.get("date"),
        "hashtags": event.get("hashtags"),
    }


def event_list_serial(events) -> list:
    return (event_individual_serial(event) for event in events)
