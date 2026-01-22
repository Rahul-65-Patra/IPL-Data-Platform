const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IPL Data Platform API",
      version: "1.0.0",
      description: "REST APIs for IPL 2022 data analytics",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

module.exports = swaggerJsdoc(options);
