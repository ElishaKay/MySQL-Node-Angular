var dbconfig = require('../config/database');
var mysql = require('mysql');

//Query data from a second database
var connection2 = mysql.createConnection(dbconfig.connection2); 
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');

module.exports = function(app) {



// Just the code for sending based on User Input in the '/send' route

app.post('/contact', (req, res) => {

  console.log(req);

// Sending email immediately based on User Input - like contact form - from client

  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

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

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Elisha" <kramer1346@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Hey from Leesh', // Subject line
      text: 'Hello world?', // plain text body
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

  // res.render('index.ejs', {rows : row,rows3:row3});
  res.render('index.ejs', {message: 'hey man. The message was sent succesfully!'});  
  });
 };   
