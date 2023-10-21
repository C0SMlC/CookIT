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

const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const ingredientRouter = require('./routes/IngredientRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');

const app = express();

// To tell express which template engine to use
app.set('view engine', 'pug');
// path join will automatically join to the views from the views folder
app.set('views', path.join(__dirname, 'views'));
// Serving static files, to view static files such as images on server
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// const corsOptions = {
//   origin: '*', // Allow requests from all origins
//   credentials: true, // Allow credentials (cookies) to be sent
// };

app.use(cors(corsOptions));

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
  res.redirect('/app');
});

app.use('/app', viewRouter);

app.use('/users', userRouter);
app.use('/ingredients', ingredientRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

module.exports = app;
