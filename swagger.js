const swaggerAutogen = require('swagger-autogen')();
const title = 'Events API';
const description = 'An events API build for CSE 341 at BYUI. Author: Alvaro B. Godoy';

const docDev = {
  info: {
    title: title,
    description: description,
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const doc = {
  info: {
    title: title,
    description: description,
  },
  host: 'cse341-events.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json'
const outputFileDev = './swagger-dev.json'
const endpointsFiles = ['./routes/index.js']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFileDev, endpointsFiles, docDev);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index')           // Your project's root file
// })