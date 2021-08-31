// Library Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App creation
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Database Connection
mongoose.connect('mongodb://localhost:27017/cms-db', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('Connected to database');
});


app.use('/aap', require('./src/routes/aap'));
app.use('/calendar', require('./src/routes/calendar'));
app.use('/learning', require('./src/routes/learning'));
app.use('/people', require('./src/routes/people'));

// App listening to port 2424
app.listen(2424, () => {
  console.log('CMS up and runnig!! 🕺🕺🕺');
});
