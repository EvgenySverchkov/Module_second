var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConfig = require("./db.js");
var mongoose = require('mongoose');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect(dbConfig.url, {useNewUrlParser: true});

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({secret: 'mySecretKey', resave:true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

module.exports = app;