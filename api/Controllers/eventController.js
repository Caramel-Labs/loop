const { EventModel } = require("../Models/eventModel");
const { ProfileModel } = require("../Models/usersModel");
const { EventUpdatesModel } = require("../Models/eventUpdatesModel");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const axios = require("axios");

//****************************************************** */
//@description     Fetch one events related to faculty
//@route           GET /events/event_id
//@access          --
//****************************************************** */
const fetchEvent = asyncHandler(async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const event = await EventModel.findById(event_id)
    .populate("eventUpdates")
    .exec();;

    if (!event) {
      //console.log(`Event with ID ${event_id} not found`);
      return res.status(404).send("Event not found");
    }

    //console.log("Event loaded successfully:", event);
    res.send(event);
  } catch (error) {
    //console.error("Error loading event", error);
    res.status(500).send("Error loading event");
  }
});

//****************************************************** */
//@description     Fetch all events related to faculty
//@route           POST /events/all
//@access          --
//****************************************************** */
const fetchAllEvents = asyncHandler(async (req, res) => {
  try {
    const filteredEvents = await EventModel.find({
      $or: [
        { selectedFaculties: req.body.faculty },
        { selectedFaculties: "all" },
      ],
    }).exec();

    if (filteredEvents.length === 0) {
      res.status(404).send("No any upcomming events");
    } else {
      console.log("Events loaded successfully:", filteredEvents);
      res.status(200).send(filteredEvents);
    }
  } catch (error) {
    console.error("Error loading all Events", error);
    res.status(500).send("Error loading Events");
  }
});

//******************************************* */
//@description     Create an event
//@route           POST /events/newEvent
//@access          --
//******************************************* */
const createEvent = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    name: Joi.required(),
    description: Joi.required(),
    selectedFaculties: Joi.required(),
    date: Joi.required(),
    time: Joi.required(),
    society: Joi.required(),
    //targetIntakes: Joi.required()
    //banner
  });

  // Joi is used to validate the request's body (req.body)
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send("Joi validation failed...");
    console.log(result.error.details[0].message);
    return;
  }

  const newevent = new EventModel({
    name: req.body.name,
    description: req.body.description,
    selectedFaculties: req.body.selectedFaculties,
    date: req.body.date,
    time: req.body.time,
    targetIntakes: req.body.targetIntakes,
    society: req.body.society,
  });
  try {
    const result = await newevent.save();
    console.log("Event saved successfully:", result);
    res.status(200).send("Event saved successfully:");
  } catch (error) {
    console.error("Error saving Event:", error);
  }
});

//****************************************************** */
//@description     Add event update
//@route           POST /events/all
//@access          --
//****************************************************** */
const createEventUpdate = asyncHandler(async (req, res) => {
  try {
    const newEventUpdate = new EventUpdatesModel({
      description: req.body.description,
      imageURL: req.body.imageURL,
      event: req.body.event_id
      });
    const savedEventUpdate = await newEventUpdate.save();
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.body.event_id,
      { $addToSet: { eventUpdates: req.body.event_id } },
      { new: true }
    );

    // Fetch user details based on the participant IDs
    const users = await ProfileModel.find({ _id: { $in: updatedEvent.participants } });

    if (!users || users.length === 0) {
      throw new Error('No users associated with this event');
    }

    // Notify each user
    users.forEach(async (user) => {
      const notificationMessage = `New event update: ${updateData}`;
      user.notifications.push(notificationMessage);
    });

    res.status(201).json(savedEventUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error Saving Event Updates" });
    console.log("Error Saving Event Updates");
  }
});

//****************************************************** */
//@description     Like an event
//@route           post /events/like
//@access          --
//****************************************************** */
const likeanEvent = asyncHandler(async (req, res) => {
  const eventId = req.body.event_id;
  const userId = req.body.user_id;

  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.likes += 1;
    const savedEvent = await event.save();

    const updatedUser = await ProfileModel.findByIdAndUpdate(
      userId,
      { $addToSet: { likedEvents: eventId } },
      { new: true }
    );

    // Calling recommendation system using async/await
    const apiUrl = `http://localhost:8000/like-event/${updatedUser.username}/${eventId}/`;

    try {
      const response = await axios.get(apiUrl);
      console.log(response.data);
    } catch (error) {
      console.error(`Error calling recommendation system: ${error.message}`);
      // Handle error as needed, maybe res.status(500).json(...)
    }

    res.status(200).json({ savedEvent, updatedUser });
    console.log({ savedEvent, updatedUser });
  } catch (error) {
    console.error("Error updating event likes:", error);
    res.status(500).json({ error: "Error updating event likes" });
  }
});

//****************************************************** */
//@description     dislike an event
//@route           post /events/dislike
//@access          --
//****************************************************** */
const dislike = asyncHandler(async (req, res) => {
  const eventId = req.params.event_id;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.likes -= 1;
    const savedEvent = await event.save();

    const updatedUser = await ProfileModel.findByIdAndUpdate(
      userId,
      { $pull: { likedEvents: eventId } },
      { new: true }
    );

    res.status(200).json({ savedEvent, updatedUser });
    console.log({ savedEvent, updatedUser });
  } catch (error) {
    console.error("Error updating event likes:", error);
    res.status(500).json({ error: "Error updating event likes" });
  }
});

module.exports = {
  fetchAllEvents,
  createEvent,
  createEventUpdate,
  fetchEvent,
  likeanEvent,
  dislike,
};
