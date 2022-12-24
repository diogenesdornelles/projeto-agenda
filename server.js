//environment variables
require('dotenv').config();
// initialize express
const express = require('express');
const app = express();
// initialize mongoose db
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit('ready');
  })
  .catch(e => console.log(e));

// Initialize session to save cookies on user's browser
const session = require('express-session');

// Save session on mongoDB by MongoStore
const MongoStore = require('connect-mongo');

// Flash: for instant messages only
const flash = require('connect-flash');

// Routes for application
const routes = require('./routes');

//

const path = require('path');

// For security application
const helmet = require('helmet');

// csrfTokens for forms
const csrf = require('csurf');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

// Middlewares for routes
const { ignoreFavicon, middlewareGlobal, csrfMiddleware, checkCsrfError } = require('./src/middlewares/middleware');

// app.use(bodyParser);
// app.use(cookieParser());

// Deactived in localhost to permit external services, like axios.
//app.use(helmet());

// Enables the posting of forms to the application
app.use(express.urlencoded({ extended: true }));

// Enables parsing json to the application
app.use(express.json());

// Declare statisc files.
app.use(express.static(path.resolve(__dirname, 'public')));

// Options to initialize sessions
const sessionOptions = session({
  secret: 'HBkjhbGKnbg33ccsxs22gbhFUKBGcrrvjhjvgvnjkjjvgvRRCdxhbJHNhV',
  store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 30,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());
app.use(cookieParser('HGBbgvGCnghCkn8655667GgCGBgcT445gVGVCfjhvhgv'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf( { cookie: true } ));
app.use(csrfMiddleware);
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(ignoreFavicon);
app.use(routes);

// Initialize server
app.on('ready', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
