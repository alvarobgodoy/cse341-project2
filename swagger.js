const swaggerAutogen = require('swagger-autogen')();

let docDev = {
  info: {
    title: 'Events API',
    description: 'An events API build for CSE 341 at BYUI. Author: Alvaro B. Godoy',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  '@definitions': {
    event: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Tech Conference"
        },
        description: {
          type: "string",
          example: "A conference focused on the latest advancements in technology"
        },
        date: {
          type: "string",
          format: "date",
          example: "2023-05-12"
        },
        location: {
          type: "string",
          example: "San Francisco, CA"
        },
        speakers: {
          type: "array",
          items: {
            type: "string",
            example: "John Doe"
          }
        },
        contactInfo: {
          type: "string",
          example: "techconference@example.com"
        },
        attendees: {
          type: "array",
          items: {
            type: "string",
            example: "63e18be2a421f7d29426070b"
          }
        }
      }
    },
    user: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "John Doe"
        },
        password: {
          type: "string",
          example: "password1"
        },
        profession: {
          type: "string",
          example: "Software Engineer"
        },
        attendsTo: {
          type: "array",
          items: {
            type: "string",
            example: "63dee3ff32595491a090e934"
          }
        }
      }
    }
  }
};

let doc = docDev;
doc.host = 'cse341-events.onrender.com';
doc.schemes = ['https'];

const outputFile = './swagger.json'
const outputFileDev = './swagger-dev.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFileDev, endpointsFiles, docDev);