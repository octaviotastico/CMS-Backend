// Library Imports
const express = require('express');

// Local Imports
const aapController = require('./src/controllers/aap_controller');

// App creation
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Send a new bundle via uD3TN's AAP interface.
app.post('/', async (req, res) => {
  res.status(201).json(await aapController.aapSend(req, res));
});

// Waits for a new bundle to be received via uD3TN's AAP interface.
app.get('/', async (req, res) => {
  res.status(200).json(await aapController.aapReceive(req, res));
});

// App listening to port 2424
app.listen(2424, () => {
  console.log('CMS up and runnig!! 🕺🕺🕺');
});