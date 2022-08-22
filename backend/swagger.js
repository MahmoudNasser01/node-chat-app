const swagger = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocsJSON = require('./docs.json')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'node chat',
      description: 'Chat Application',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./backend/routes/*.js'],
}

const swaggerSpec = swagger(options)
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocsJSON, { explorer: true }));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.info(`Docs available at http://localhost:${port}/docs`)
}

module.exports = swaggerDocs
