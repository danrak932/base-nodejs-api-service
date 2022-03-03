const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const greetingRouter = require('./routes/greetingRouter');

//INIT APP
const app = express();

//CONFIG
const API_VERSION = process.env.API_VERSION;

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//cors
app.use(cors());
app.options('*', cors()); //permit all

//helmet
// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//MIDDLEWARES
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
console.log(`/api/${API_VERSION}/greetings`);
app.use(`/api/${API_VERSION}/greetings`, greetingRouter);

//ERROR HANDLING
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
