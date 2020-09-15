const express = require('express')
const server = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc')
const options = {
    definition: {
      openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      info: {
        title: 'Hello World', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    // Path to the API docs
    apis: ['./routes/*/*.js'],
  };
const swaggerSpec = swaggerJSDoc(options);
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

server.use(express.json())

const Bus = require('./routes/bus');
server.use('/bus',Bus)


// sequelize.sync()
// sequelize.sync({force:true}) //for creating table for one time only

server.listen(3000,()=>{
    console.log('server started at port 3000');
})
