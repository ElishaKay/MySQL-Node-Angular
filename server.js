var dotenv = require('dotenv').config();
var dbconfig = require('./config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var express  = require('express');
var session  = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var io = require('socket.io-client');
 


var j = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

// For deployment
// var port     = process.env.PORT || 80;

// for development
var port     = 8000;

var passport = require('passport');
var flash    = require('connect-flash');

console.log(process.env.HOST);

require('./config/passport.js')(passport); 


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));
app.use(require("body-parser").json())
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'kodizimcomisrunning',
    resave: true,
    saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('App is running on localhost:' + port);
