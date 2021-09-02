// Library Imports
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


// Database Connection
mongoose.connect('mongodb://localhost:27017/cms-db', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('Connected to database');
});


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
app.listen(2424, () => {
  console.log('CMS up and runnig!! 🕺🕺🕺');
});


// Socket io client setup
const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:7575");


// (Move to a separate file)
ioClient.on("message", (data) => {
  console.log("Message received from backend:", data);
});

ioClient.emit("message", "Hello from CMS backend!");
