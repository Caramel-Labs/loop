const asyncHandler = require("express-async-handler");
const { MessegeModel } = require("../../Models/ChatFeatureModels/messegeModel");
const { ProfileModel } = require("../../Models/usersModel");
const { ChatModel } = require("../../Models/ChatFeatureModels/chatModel");
const axios = require('axios');

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await MessegeModel.find({
      chat: req.params.chatId,
    }).populate("sender", "name pic email");
    //.populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const usermessege = req.body.messege;
  const chatId = req.body.chat_id;

  console.log(req.body);

  try {
    const message = new MessegeModel({
      isbot: false,
      content: usermessege,
      chat: chatId,
    });
    await message.save();

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { $addToSet: { messeges: message._id } },
      { new: true }
    );

    const response = await axios.post("http://localhost:8001/chatbot/", {
      content: usermessege,
      username: username,
    });
    const responseText = response.data.response;
    const responseObject = {responseText};
    console.log(responseObject )


    const botmessage = new MessegeModel({
      isbot: true,
      content: responseObject.responseText,
      chat: chatId,
    });
    await botmessage.save();

    const updatedChatWithBotMessage = await ChatModel.findByIdAndUpdate(
      chatId,
      { $addToSet: { messeges: botmessage._id } },
      { new: true }
    );

    res.status(200).json(responseObject );
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = { allMessages, sendMessage };
