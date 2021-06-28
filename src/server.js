'use strict';

const express = require('express');
const errorHandler = require('../src/error-handlers/500');
const notFoundHandler = require('../src/error-handlers/404');
const logger = require('../src/middelware/logger');
const valdidator  = require('../src/middelware/validator');
const app = express();

// Global middelwares
app.use(express.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/bad', (req, res) => {
  throw new Error('Something went wrong');
});

app.get('/foo', (req, res) => {
  res.status(404).json({error: 'Not Found'});
});

app.get('/person',valdidator, (req, res) => {
  const params = {
    name: req.query.name,
  };
  if(typeof req.query.name !== 'string') {
    res.status(500).json({error: 'No Query'});
  } else {
    res.json(params);
  }
});


// Start function  
const start = (port) => {
  app.listen(port, () => {
    console.log(`Server is working on ${port}`);
  });
};

// using the error handlers by the app
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server:app,
  start: start,
};