npm init
npm i express
npm i sequelize
npm i nodemon
config package.json
create file server.js for running server at port 3000
search how to create api in express in expressjs.com
create route(API) for url based search

In server.js{
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
}

In Modules {
    /**
    * @swagger
    *
    * /bus:
    *   get:
    *     description: Login to the application
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: username
    *         description: Username to use for login.
    *         in: formData
    *         type: string
    *       - name: password
    *         description: User's password.
    *         in: formData
    *         type: string
    *     responses:
    *       200:
    *         description: login
    */
}

create request.http file and put http://localhost:3000  for testing api



