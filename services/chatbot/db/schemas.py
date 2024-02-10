# Schemas for users


def user_individual_serial(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user.get("username"),
        "firstName": user.get("firstName"),
        "lastName": user.get("lastName"),
        "faculty": user.get("faculty"),
        "intake": user.get("intake"),
    }


def user_list_serial(users) -> list:
    return (user_individual_serial(user) for user in users)


# Schemas for events


def event_individual_serial(event) -> dict:
    return {
        "id": str(event["_id"]),
        "name": event.get("name"),
        "society": event.get("society"),
        "description": event.get("description"),
    }


def event_list_serial(events) -> list:
    return (event_individual_serial(event) for event in events)


# Schemas for societies


def society_individual_serial(society) -> dict:
    return {
        "id": str(society["_id"]),
        "societyName": society.get("societyName"),
        "description": society.get("description"),
    }


def society_list_serial(societies) -> list:
    return (society_individual_serial(society) for society in societies)
