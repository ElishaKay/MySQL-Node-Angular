var dbconfig = require('../config/database');
var mysql = require('mysql');

//Query data from a second database
var connection2 = mysql.createConnection(dbconfig.connection2); 
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');

module.exports = function(app) {

// Every day at 5 am, segment the audience that wants a specific daily update:
     
    var j = schedule.scheduleJob('42 * * * * *', function(){

      console.log('The answer to life, the universe, and everything!');

      connection2.query("select * from client where client_email like '%kramer1346%'", function (err, rows) {
      console.log('This is the result of the query on top',rows[0].client_email);   


      senderEmail = 'alephmarketingpros@gmail.com';      
      
      console.log(rows);

      
     });

    // res.render('',{ message: req.flash('loginMessage') });
      
    console.log('mailgun logic goes here with variables');

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


// Pass in the client id here - in this case 404 (Hannah)
      connection2.query("select * from client where client_email like '%kramer1346%'", function (err, rows) {
        console.log('printing the kramer1346 object within the send mail function',rows[0].client_email);
        recipientEmail = rows[0].client_email;

        const output = `


                                Wassup `+ rows[0].client_name + `<---- This is the name associated with the account, taken from the sql results</a>
             

         `;

     

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"GX" <'+senderEmail+'>', // sender address
          to: recipientEmail, // list of receivers
          subject: 'Jan 18th- Ramat Gan Test', // Subject line
          text: rows[0].client_name, // plain text body
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

     });

    
}
)};