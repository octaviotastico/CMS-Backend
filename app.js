// Library Imports
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('delay-tolerant-mongoose');
const { Server } = require("socket.io");

// Local Imports
const commons = require('./src/commons/functions');

// Parsing parameters (if given)
var args = process.argv.slice(2);

const HTTP_PORT = commons.parseParameters(args, '--http-port', 'HTTP_PORT', 2424);
const TCP_PORT = commons.parseParameters(args, '--tcp-port', 'TCP_PORT', 2525);

const DTN_HOST = commons.parseParameters(args, '--dtn-host', 'DTN_HOST', 'localhost');
const DTN_PORT = commons.parseParameters(args, '--dtn-port', 'DTN_PORT', 7474);


// Saving them so we can use them later
global.HTTP_PORT = HTTP_PORT;
global.TCP_PORT = TCP_PORT;


//////////////////////////
///// Database setup /////
//////////////////////////


// Database Connection
mongoose.connect('mongodb://localhost:27017/cms-db', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database');
});

mongoose.configDtnAndStart({ DTN_HOST, DTN_PORT });

/////////////////////////////
///// HTTP Server setup /////
/////////////////////////////


// App setup
const app = express();
app.use('/storage', express.static('storage'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Routes
app.use('/calendar', require('./src/routes/calendar'));
app.use('/learning', require('./src/routes/learning'));
app.use('/users', require('./src/routes/users'));


// Listen for HTTP requests on port 2424
app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server up and runnig on port ${HTTP_PORT}!! 🕺🕺🕺`);
});


////////////////////////////////////////////////
///// Socket Server setup (for videocalls) /////
////////////////////////////////////////////////


// Socket io server setup.
const server = http.createServer(app);
const io = new Server(server);


// (Move to a separate file).
io.on("connection", (socket) => {
  console.log("Socket connection made!");

  // Wellcome message.
  socket.emit("message", "Hello from the CMS backend!");

  // Listen for videocalls.
  socket.on("videocall", (data) => {
    console.log("Received videocall:", data);
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
