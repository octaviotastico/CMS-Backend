// Library Imports
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

// Local Imports
const commons = require('./src/commons/functions');

// Parsing parameters (if given)
var args = process.argv.slice(2);
// CMS Backend (our) Variables
const HTTP_PORT = commons.parseParameters(args, '--http-port', 'HTTP_PORT', 2424);
const TCP_PORT = commons.parseParameters(args, '--tcp-port', 'TCP_PORT', 2525);
// DTN Backend (their) Variables
const DTN_HOST = commons.parseParameters(args, '--dtn-host', 'DTN_HOST', 'http://localhost');
const DTN_PORT = commons.parseParameters(args, '--dtn-port', 'DTN_PORT', 7474);


// Saving them so we can use them later
global.HTTP_PORT = HTTP_PORT;
global.TCP_PORT = TCP_PORT;
global.DTN_HOST = DTN_HOST;
global.DTN_PORT = DTN_PORT;


////////////////////////////////
///// Local Database setup /////
////////////////////////////////


// Database Connection
mongoose.connect('mongodb://localhost:27017/cms-db', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('Connected to database');
});


/////////////////////////////
///// HTTP Server setup /////
/////////////////////////////


// App setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Routes
app.use('/calendar', require('./src/routes/calendar'));
app.use('/learning', require('./src/routes/learning'));
app.use('/people', require('./src/routes/people'));


// Listen for HTTP requests on port 2424
app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server up and runnig on port ${HTTP_PORT}!! 🕺🕺🕺`);
});


////////////////////////////////////////
///// DTN Backend connection setup /////
////////////////////////////////////////


// Socket io server setup
const server = http.createServer(app);
const io = new Server(server);


// (Move to a separate file)
io.on("connection", (socket) => {
  console.log("Socket connection made!");

  // Wellcome message
  socket.emit("message", "Hello from the CMS backend!");

  // Listen for new DTN Backend messages, to update local database.
  socket.on("update", (data) => {
    console.log("Received DTN update message:", data);
    console.log("Updating local database...");
  });

  // Listen for text messages coming from DTN Backend.
  socket.on("text-message", (data) => {
    console.log("Received DTN Backend text message:", data);
    console.log("Forwarding message to Frontend...");
  });

  // Listen for videocalls coming from DTN Backend.
  socket.on("videocall", (data) => {
    console.log("Received DTN Backend videocall:", data);
    console.log("Forwarding DTN to Frontend...");
  });

  // Goodbye message.
  socket.on("disconnect", () => {
    console.log("Socket disconnected!");
  });
});


// Listen for socket requests on port 2525
server.listen(TCP_PORT, () => {
  console.log(`Socket Server listening on port ${TCP_PORT}!! 🕺🕺🕺`);
});
