// Library Imports
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('delay-tolerant-mongoose');
const { Server } = require('socket.io');

// Local Imports
const commons = require('./src/commons');


/// ------------------ ///
/// --- Parameters --- ///
/// ------------------ ///


var args = process.argv.slice(2);

const HTTP_PORT = commons.functions.parseParameters({
  args: args,
  argName: '--http-port',
  envName: 'HTTP_PORT',
  defaultValue: 2424,
});

const TCP_PORT = commons.functions.parseParameters({
  args: args,
  argName: '--tcp-port',
  envName: 'TCP_PORT',
  defaultValue: 2525,
});

const AGENT_ID = commons.functions.parseParameters({
  args: args,
  argName: '--agent-id',
  envName: 'AGENT_ID',
  defaultValue: 'bundlesink',
});

const DTN_HOST = commons.functions.parseParameters({
  args: args,
  argName: '--dtn-host',
  envName: 'DTN_HOST',
  defaultValue: 'localhost',
});

const DTN_PORT = commons.functions.parseParameters({
  args: args,
  argName: '--dtn-port',
  envName: 'DTN_PORT',
  defaultValue: 4242,
});

const EID_LIST = commons.functions.parseParameters({
  args: args,
  argName: '--eid-list',
  envName: 'EID_LIST',
  defaultValue: ['dtn://b.dtn/bundlesink'],
  list: true,
});

const REAL_TIME_UPDATE = commons.functions.parseParameters({
  args: args,
  argName: '--real-time-update',
  envName: 'REAL_TIME_UPDATE',
  defaultValue: true,
});

const MONGO_HOST = commons.functions.parseParameters({
  args: args,
  argName: '--mongo-host',
  envName: 'MONGO_HOST',
  defaultValue: 'localhost',
});

const MONGO_PORT = commons.functions.parseParameters({
  args: args,
  argName: '--mongo-port',
  envName: 'MONGO_PORT',
  defaultValue: 27017,
});

const MONGO_DB = commons.functions.parseParameters({
  args: args,
  argName: '--mongo-db',
  envName: 'MONGO_DB',
  defaultValue: 'cms-db',
});


/// ---------------------- ///
/// --- Database setup --- ///
/// ---------------------- ///


// Database Connection
mongoose.connect(
  `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Connected to database');
});

mongoose.configDtnAndStart({ AGENT_ID, DTN_HOST, DTN_PORT, EID_LIST, REAL_TIME_UPDATE });


/// --------------------- ///
/// --- Storage Setup --- ///
/// --------------------- ///


commons.fileSystem.createFolder('storage/learning');


/// ------------------------- ///
/// --- HTTP Server setup --- ///
/// ------------------------- ///


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
app.use('/auth', require('./src/routes/auth'));

// Listen for HTTP requests on port 2424
app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server up and runnig on port ${HTTP_PORT}!! 🕺🕺🕺`);
});


/// --------------------------- ///
/// --- Socket Server setup --- ///
/// --------------------------- ///


// Socket io server setup.
const server = http.createServer(app);
const io = new Server(server);


// (Move to a separate file).
io.on("connection", (socket) => {
  console.log("Socket connection made!");

  // Wellcome message.
  socket.emit("message", "Hello from the CMS backend!");

  // Listen for messages.
  socket.on("message", (data) => {
    console.log("Received message:", data);
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
