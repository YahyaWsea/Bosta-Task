const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { logger } = require('./logger/logger');

const connectToDB = require('./boot/00-db');
const startMonitorChecks = require('./boot/01-monitorChecks');
const swaggerDefinition = require('./swagger/swaggerConfig');
const authRouter = require('./routes/auth.routes');
const checkRouter = require('./routes/check.routes');
const { port } = require('./config');

// Connect to database
connectToDB();

// Monitor all database checks
startMonitorChecks();

const app = express();

// configure swagger
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use('/', authRouter);
app.use('/checks', checkRouter);
app.use((err, req, res, next) => {
  const {
    statusCode = '500', message, code, details,
  } = err;
  logger.error(`Error in handling request with the following details: ${code} - ${message}`);
  res.status(statusCode).json({ code, message, details });
});

app.listen(port, () => {
  logger.info(`Server is listening on Port ${port}`);
});
