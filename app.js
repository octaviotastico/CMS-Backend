// Library Imports
const express = require('express');
const mongoose = require('mongoose')

// Local Imports
const aapController = require('./src/controllers/aap_controller');
const learningController = require('./src/controllers/learning');

// TODO: Make app.use work xD
// const learningRoutes = require('./src/routes/learning');
// app.use('/learning', learningRoutes);

// App creation
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cms-db', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('Connected to database');
});

// Send a new bundle via uD3TN's AAP interface.
app.post('/', async (req, res) => {
  await aapController.aapSend(req, res);
});

// Waits for a new bundle to be received via uD3TN's AAP interface.
app.get('/', async (req, res) => {
  await aapController.aapReceive(req, res);
});

// Get all the learning articles
app.get('/learning', async (req, res) => {
  await learningController.getAllArticles(req, res);
});

// Post a new learning article
app.post('/learning', async (req, res) => {
  await learningController.postArticle(req, res);
});


// App listening to port 2424
app.listen(2424, () => {
  console.log('CMS up and runnig!! 🕺🕺🕺');
});
