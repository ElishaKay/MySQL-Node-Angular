var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.connection.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.client_id);
    });


    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM client WHERE client_id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });


    passport.use(
        'local-signup',
        new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
            console.log('ran the local-signup function');
            connection.query("SELECT * FROM client WHERE client_email = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    var newUserMysql = {
                        username: username,
                        password: password
                    };

                    console.log('this is the newUserMysql object', newUserMysql);

                    var insertQuery = "INSERT INTO client ( values (NOW(),?,?)";

                    connection.query('INSERT INTO client (client_name, client_creation_date, client_email, client_password) VALUES ("'+cover_image+'","'+req.body.title+'","'+encodedhtml+'","'+req.user.client_id+'")');

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        console.log()
                        newUserMysql.client_id = rows.insertId;

                        return done(null, newUserMysql);
                    
                    );
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            connection.query("SELECT * FROM client WHERE client_email = ?",[username], function(err, rows){
                if (rows.length) {
                     if (password == rows[0].client_password){
                     return done(null, rows[0]);
                }

                else if (err){
                    return done(err);
                }

                else if (password != rows[0].client_password) {
                    return done(null, false, req.flash('loginMessage', 'Wrong password Muchacho!'));
                }

                } else {                
                    return done(null, false, req.flash('loginMessage', 'That Username does not exist in our database Muchacho!'));                              
                }
                 
            });
        })
    );
};