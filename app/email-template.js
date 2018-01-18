var dbconfig = require('../config/database');
var mysql = require('mysql');

//Query data from a second database
var connection2 = mysql.createConnection(dbconfig.connection2); 
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');

module.exports = function(app) {

// Every day at 5 am, segment the audience that wants a specific daily update:
     
    var j = schedule.scheduleJob('42 * * * * *', function(){
        // Step 1: Define the email that will appear as the sender of your emails
      console.log('The answer to life, the universe, and everything!');
      // Step 2: Define the Segment that will be receiving your email every minute

      senderEmail = 'elisha@growth-x.com'; 

      connection2.query("select * from client where client_email like '%cifgiving%'", function (err, rows) {
      console.log('This is the result of the query on top',rows[0].client_email);   

      // looping through results and sending email to each person in the audience
            for (i = 0; i < rows.length; i++) { 
                recipientEmail = rows[i].client_email;
                sendmail(senderEmail, recipientEmail, rows[i].client_id);
            };
        });
     });

    var sendmail = function(senderEmail, recipientEmail, clientIdFromSql) { 

    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
           service: 'Mailgun',
           auth: {
               user: process.env.MAILGUN_USER, // generated ethereal user
               pass: process.env.MAILGUN_PASSWORD  // generated ethereal password
             },
           tls:{
           rejectUnauthorized:false
               }
        });


        // Pass in the client id here
        connection2.query('select * from client where client_id = ?',clientIdFromSql, function (err, rows) {
        console.log('printing the kramer1346 object within the send mail function',rows[0].client_email);
        var recipientEmail = rows[0].client_email;

        const output = `
         <p>Wassup `+ rows[0].client_email + `<---- This is the name associated with the account, taken from the sql results</p>
         <p>Wassup `+ rows[0].client_password + `<---- And this is the client password taken from the sql results</p>
        
         `;

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Leesh" <'+senderEmail+'>', // sender address
          to: recipientEmail, // list of receivers
          subject: 'Jan 19th - Home Test', // Subject line
          text: rows[0].client_email, // plain text body
          html: output // html body
              };


      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));     
      });
      // Closing second sql Query
     });
// Closing sendmail function
 }};    