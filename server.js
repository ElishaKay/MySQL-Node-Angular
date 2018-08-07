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

var express = require('express'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', (process.env.PORT || 5000))


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// Socket.io Communication

messages = [];
users = [];
connections = [];


io.sockets.on('connection', function(socket){


    connections.push(socket);
    console.log("connected: % of sockets connected", connections.length);
    
    console.log('this is the server talking');

    //Disconnect
    socket.on('disconnect', function(data){
        console.log('this is the socket.username.person',socket.username);

        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected % of sockets connected', connections.length);        
    });

    //Message
    socket.on('send message', function(data){
        messages.push(data);
        io.sockets.emit('new message', messages);
    });
    
    // new user
    socket.on('new user', function(data){
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
        updateMessages(messages);
        console.log('this is the users array',users);
    });

    function updateUsernames(){
        io.sockets.emit('get users', users)
    } 

});

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


var j = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life and love, the universe, and everything!');
});

var port     = process.env.PORT || 80;

var passport = require('passport');
var flash    = require('connect-flash');

console.log(process.env.HOST);

require('./config/passport.js')(passport); 

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

console.log('App is running on localhost:' + port);
