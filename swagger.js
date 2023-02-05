const swaggerAutogen = require('swagger-autogen')();
let host = 'localhost:8080'
let scheme = 'http'

// Change host and scheme if in production environments
if(process.env.PORT == 10000) {
  host = 'https://cse341-events.onrender.com'
  scheme = 'https'
}

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Description...',
  },
  host: host,
  schemes: [scheme],
};

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index')           // Your project's root file
// })