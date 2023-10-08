const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController');

const app = express();

// To tell express which template engine to use
app.set('view engine', 'pug');
// path join will automatically join to the views from the views folder
app.set('views', path.join(__dirname, 'views'));
// Serving static files, to view static files such as images on server
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// enable cors
app.use(cors());
app.options('*', cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

if (process.env.NODE_ENV !== 'production') {
  //Logging request details to console
  app.use(morgan('dev'));
}

// Too many requests

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! Please try again later.',
});

app.use('/api', limiter);

// body parser
app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitisation against NOSQL query injection
// {
//     "email":{"$gt":""},
//     "password":"aaaaaaaaaaaa"
// }
app.use(mongoSanitize());

// Data sanitize gainst xss i.e malicious html code included with js
// Cross-Site Scripting
app.use(xss());

app.use(compression());

app.get('/', (req, res) => {
  res.status(200).render('LandingPage', {
    title: 'Home',
  });
});
app.get('/recipe', (req, res) => {
  res.status(200).render('LandingPage', {
    title: 'recipe',
  });
});
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

module.exports = app;
