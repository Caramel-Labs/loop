// *****************************************************
//                   CARAMEL BACKEND
// *****************************************************
// This is the 'driver code' (commonly referred to as
// the 'entry point') of the backend of the Caramel App.
// This is a NodeJS application built using the ExpressJS
// framework.
//
// To run this application, open up a terminal in this
// directory, and enter the following commands:
// 1. npm i
// 2. node .
// *****************************************************

// IMPORTS AND OTHER REQUIREMENTS
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const config = require("config");

// necessary routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const societyRoutes = require("./routes/societyRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const exploreRoutes = require("./routes/exploreRoutes");

const auth = require("./routes/auth");
const email = require("./routes/email");
const chatRoutes = require("./routes/ChatFeatureRoutes/chatRoute");
const messegeRoutes = require("./routes/ChatFeatureRoutes/messegeRoute");
const paymentRoutes = require("./routes/paymentRoutes");

// APP INITIALIZATION

// instantiating an ExpressJS app
const app = express();

// set allowed origins for CORS
const allowedOrigins = ["http://localhost:3000", "http://localhost:8000"];

// middleware for the app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use("/profiles", userRoutes);
app.use("/events", eventRoutes);
app.use("/society", societyRoutes);
app.use("/faculty", facultyRoutes);
app.use("/explore", exploreRoutes);

app.use("/auth", auth);
app.use("/email", email);
app.use("/chat", chatRoutes);
app.use("/messege", messegeRoutes);
app.use("/payment", paymentRoutes);

// DATABASE CONNECTION

// The Caramel App is powered by a MongoDB database hosted on an
// Atlas server. The 'database.js' module in the config directory
// (as imported above) is responsible for orchestrating the
// entire database connection process, including any error handling.
// The driver code (this file) will simply call the connectDB()
// method in the 'database.js' module.

// connecting to the database
connectDB();

// SERVER SETUP

// 1. Starting up the server

// This is a simple console log to indicate that 'index.js'
// is being run.

console.log(`BACKEND SERVER STARTED IN ${config.get("Name")} ENVIRONMENT`);

// 2. Setting up the port number for the server to listen to

// Here, the server will listen to the port number specified
// in the PORT variable (as is the case with hosting services
// such as Heroku). If this variable is not pre-defined (e.g.
// we are running this app locally), the server will default to
// listening to port number 3001:

const port = process.env.PORT;

// NOTE:
// Port 3001 has been used specifically since we cannot use NodeJS's
// default port 3000, since the NextJS app (the frontend) uses
// that port when we are running this project locally.

// 3. Starting listening to requests on previously specified port

// The NextJS frontend will send HTTP requests to the backend through
// port number 3001, which the backend must start listening to.
// The listen() function of the 'app' instance also includes a callback
// function to log 'Listening to Port <port-number>' to the console
// after listening begins:

app.listen(port, () => console.log(`Listening to Port ${port}`));

module.exports = app;
