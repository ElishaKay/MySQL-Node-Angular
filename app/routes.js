var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended:false})
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');

module.exports = function(app,passport) {

// Defining variables

    const output = '';

    // Send email



  // const output = `
  //   <p>You have a new contact request</p>
  //   <h3>Contact Details</h3>
  //   <ul>  
  //     <li>Name: ${req.body.name}</li>
  //     <li>Company: ${req.body.company}</li>
  //     <li>Email: ${req.body.email}</li>
  //     <li>Phone: ${req.body.phone}</li>
  //   </ul>
  //   <h3>Message</h3>
  //   <p>${req.body.message}</p>
  // `;

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   service: 'Mailgun',
  //   auth: {
  //       user: process.env.MAILGUN_USER, // generated ethereal user
  //       pass: process.env.MAILGUN_PASSWORD  // generated ethereal password
  //   },
  //   tls:{
  //     rejectUnauthorized:false
  //   }
  // });

  // // setup email data with unicode symbols
  // let mailOptions = {
  //     from: '"Growth-X Team" <help@growth-x.com>', // sender address
  //     to: req.body.email, // list of receivers
  //     subject: 'Hey from GX', // Subject line
  //     text: 'Hello world?', // plain text body
  //     html: output // html body
  // };

  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);   
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  //     
  // });

    

  // 

// var sendmail = function(){

    app.post('/send', (req, res) => {

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
        connection.query('select * from client where client_id = ?',1, function (err, rows) {
       
        const output = `
<body leftmargin="0" topmargin="0" marginwidth="100%" marginheight="0" yahoo="fix" style="font-family: Georgia, Times, serif">

<!-- Wrapper -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
        <td width="100%" valign="top" bgcolor="#ffffff" style="padding-top:20px">

          
            <!-- One Column -->
            <table width="100%"  class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#eeeeed">
                <tr>
                    <td valign="top" style="padding:0" bgcolor="#ffffff">
                        <a href="#"><img  class="deviceWidth" src="http://www.emailonacid.com/images/blog_images/Emailology/2013/free_template_1/headliner.jpg" alt="" border="0" style="display: block; border-radius: 4px;" /></a>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 13px; color: #959595; font-weight: normal; text-align: left; font-family: Georgia, Times, serif; line-height: 24px; vertical-align: top; padding:10px 8px 10px 8px" bgcolor="#eeeeed">

                        <table>
                            <tr>
                                <td valign="top" style="padding:0 10px 10px 0">
                                    <img  src="http://www.emailonacid.com/images/blog_images/Emailology/2013/free_template_1/1.jpg" alt="" border="0" align="left" />
                                </td>
                                <td valign="middle" style="padding:0 10px 10px 0"><a href="#" style="text-decoration: none; color: #272727; font-size: 16px; color: #272727; font-weight: bold; font-family:Arial, sans-serif ">

                                Wassup `+ rows[0].client_email + `<---- This is the sql results</a>
                                </td>
                            </tr>
                        </table>

                      Below are some of your responses from today, and some of of your stats.
                    </td>
                </tr>
            </table><!-- End One Column -->


<div style="height:15px">&nbsp;</div><!-- spacer -->


            <!-- 2 Column Images & Text Side by SIde -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth" bgcolor="#202022">
                <tr>
                    <td style="padding:10px 0">
                            <table align="left" width="49%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth">
                                <tr>
                                    <td valign="top" align="center" class="center" style="padding-top:20px">
                                                <p border="0" style="border-radius: 4px; color: #ccc; width: 300px; display: block;" class="deviceWidth" />
                                                LinkedIn User: Anna Glick
                                                </p>
                                    </td>
                                </tr>
                            </table>
                            <table align="right" width="49%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth">
                                <tr>
                                    <td style="font-size: 12px; color: #959595; font-weight: normal; text-align: left; font-family: Georgia, Times, serif; line-height: 24px; vertical-align: top; padding:10px 8px 10px 8px">

                                        <table>
                                            <tr>
                                                <td valign="top" style="padding:0 10px 10px 5px">
                                                    <img  src="http://www.emailonacid.com/images/blog_images/Emailology/2013/free_template_1/2.jpg" alt="" border="0" align="left" />
                                                </td>
                                                <td valign="middle" style="padding:0 10px 10px 0"><a href="#" style="text-decoration: none; font-size: 16px; color: #ccc; font-weight: bold; font-family:Arial, sans-serif ">Two column - text right</a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="mso-table-lspace:0;mso-table-rspace:0; margin:0">
                                            Sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi.
                                            <br/><br/>

                                            <table width="100%" align="right">
                                                <tr>
                                                    <td background="http://www.emailonacid.com/images/blog_images/Emailology/2013/free_template_1/blue_back.jpg" bgcolor="#409ea8" style="padding:5px 0;background-color:#409ea8; border-top:1px solid #77d5ea; background-repeat:repeat-x" align="center">
                                                        <a href=""
                                                        style="
                                                        color:#ffffff;
                                                        font-size:13px;
                                                        font-weight:bold;
                                                        text-align:center;
                                                        text-decoration:none;
                                                        font-family:Arial, sans-serif;
                                                        -webkit-text-size-adjust:none;">
                                                                Read More
                                                        </a>

                                                    </td>
                                                </tr>
                                            </table>

                                        </p>
                                    </td>
                                </tr>
                            </table>

                    </td>
                </tr>
                <tr>
                    <td bgcolor="#fe7f00"><div style="height:6px">&nbsp;</div></td>
                </tr>
            </table><!-- End 2 Column Images & Text Side by SIde -->

<div style="height:15px">&nbsp;</div><!-- spacer -->


    

            <!-- 2 Column Images - text left -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth" bgcolor="#eeeeed">
                <tr>
                    <td style="padding:10px 0">
                            <table align="right" width="49%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth">
                                <tr>
                                    <td valign="top" align="right" class="center" style="padding:20px 10px 0 0">
                                        <p style="mso-table-lspace:0;mso-table-rspace:0; margin:0"><a href="#"><img width="267" src="http://www.emailonacid.com/images/blog_images/Emailology/2013/responsive3.jpg" alt="" border="0" style="border-radius: 4px; width: 267px; display: block;" class="deviceWidth" /></a></p>
                                    </td>
                                </tr>
                            </table>
                            <table align="left" width="49%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth">
                                <tr>
                                    <td style="font-size: 13px; color: #959595; font-weight: normal; text-align: left; font-family: Georgia, Times, serif; line-height: 24px; vertical-align: top; padding:20px 0 20px 15px">

                                        <table>
                                            <tr>
                                                <td valign="top" style="padding:0 10px 15px 0">
                                                    <img  src="http://www.emailonacid.com/images/blog_images/Emailology/2013/free_template_1/6.jpg" alt="" border="0" align="left" />
                                                </td>
                                                <td valign="middle" style="padding:0 10px 10px 0"><a href="#" style="text-decoration: none; font-size: 16px; color: #363636; font-weight: bold; font-family:Arial, sans-serif ">Two column - text right</a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="mso-table-lspace:0;mso-table-rspace:0; margin:0">
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.
                                            <br/><br/>

                                        </p>
                                    </td>
                                </tr>
                            </table>
                    </td>
                </tr>
            </table><!-- End 2 Column Images  - text left -->




            <!-- 4 Columns -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                    <td bgcolor="#363636" style="padding:30px 0">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth">
                            <tr>
                                <td>
                                        <table width="45%" cellpadding="0" cellspacing="0"  border="0" align="left" class="deviceWidth">
                                            <tr>
                                                <td valign="top" style="font-size: 11px; color: #f1f1f1; color:#999; font-family: Arial, sans-serif; padding-bottom:20px" class="center">

                                                    This email is complementary of Growth-X<br/>
                                                     To unsubscribe email: help@growth-x.com<br/>

                                                    

                                                </td>
                                            </tr>
                                        </table>

                                        <table width="40%" cellpadding="0" cellspacing="0"  border="0" align="right" class="deviceWidth">
                                            <tr>
                                                <td valign="top" style="font-size: 11px; color: #f1f1f1; font-weight: normal; font-family: Georgia, Times, serif; line-height: 26px; vertical-align: top; text-align:right" class="center">

                                                    <a href=""><img src="http://www.emailonacid.com/images/emails/5_13/footer_rss.gif" width="42" height="42" alt="RSS Feed" title="RSS Feed" border="0" /></a>

                                                    <a href=""><img src="http://www.emailonacid.com/images/emails/5_13/footer_twitter.gif" width="42" height="42" alt="Twitter" title="Twitter" border="0" /></a>

                                                    <a href=""><img src="http://www.emailonacid.com/images/emails/5_13/footer_vm.gif" width="42" height="42" alt="Vimeo" title="Vimeo" border="0" /></a>

                                                    <a href=""><img src="http://www.emailonacid.com/images/emails/5_13/footer_fb.gif" width="42" height="42" alt="Facebook" title="Facebook" border="0" /></a>
                                                    <br />

                                                    <a href="#"><img src="http://growth-x.com/assets/img/logo-circle.png" alt="" border="0" style="padding-top: 5px;" /></a><br/>
                                                    <a href="#" style="text-decoration: none; color: #848484; font-weight: normal;">555-555-5555</a><br/>
                                                    <a href="#" style="text-decoration: none; color: #848484; font-weight: normal;">help@growth-x.com</a>
                                                </td>
                                            </tr>
                                        </table>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table><!-- End 4 Columns -->

        </td>
    </tr>
</table> <!-- End Wrapper -->

</body>
            
             

         `;

     

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Nodemailer Contact" <your@email.com>', // sender address
          to: 'kramer1346@gmail.com', // list of receivers
          subject: 'Ramat Gan Test', // Subject line
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

         res.redirect('/');
});



// Sending at specific time:
     
//     var j = schedule.scheduleJob('* * * * * *', function(){
//       console.log('The answer to life, the universe, and everything!');



// // Getting info from DB and sending in email

//       

//       // End of mail sending


//     });


      app.get('/',isLoggedIn,function(req,res){
        res.render('index.ejs'); 
    });


    app.get('/community', function(req, res) {
        var row = [];
        var row2=[];
        var row3=[];

        connection.query('select * from client where client_id = ?',[req.user.client_id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                        
                    }  
                }
                        
            }

            
         connection.query('select * from client inner join post on client.client_id = post.client_id', function (err, rows2) {
                if (err) {
                    console.log(err);
                } else {
                    if (rows2.length) {
                        for (var i = 0, len = rows2.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                            row3[i] = rows2[i];
                        }  
                    }            
                }
        res.render('community.ejs', {rows : row,rows3:row3});     
            }); 
        });
    });



      // Get row for the logged in user (i.e. client)
    app.get('/api/user',isLoggedIn,function(req,res){
        var row = [];
        connection.query('select * from client where client_id = ?',[req.user.client_id], function (err, rows) {
            
            res.json(rows);
        });
      
    });


    // Get all campaigns
     app.get('/api/campaigns',isLoggedIn,function(req,res){
        var row = [];
        connection.query('select * from campaign where client_id = ?',[req.user.client_id], function (err, rows) {
            
            res.json(rows);
        });
      
    });


     // Get all LinkedIn Users of the logged in client

     app.get('/api/users',isLoggedIn,function(req,res){
        var row = [];
        connection.query("select concat(user_first_name, ' ', user_last_name) as fullname from user where client_id = ?",[req.user.client_id], function (err, rows) {
            
            res.json(rows);
        });
      
    });




    app.get('/api/todos',function(req,res){
        var row = [];
      connection.query('select * from client inner join post on client.client_id = post.client_id', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                    }  
                }
                console.log(row);
                
            }
            res.json(rows);
            
        });
    });

    app.get('/api/viewcomments/:postID',function(req,res){
        var postID = req.params.postID;
        var row = [];
        console.log(postID);
        connection.query('select client.client_email as u ,t1.y as t,t1.idsi as idsi1 from (select comment.comment_id as k,comment.text as y,comment.client_id as x,post.post_id as idsi from comment inner join post on post.post_id = comment.post_id where post.post_id= "'+postID+'" ) as t1 , client where client.client_id = t1.x  order by k desc limit 4 ', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                    }  
                }
                console.log(row);
                
            }
            res.json(rows);
            
        });
    });

    app.post('/api/todos',function(req,res){
        var row = [];
        var row2=[];
        connection.query('select * from client where client_id = ?',[req.user.client_id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];  
                    }  
                }
                console.log(row);
            }
            connection.query('insert into post(text,client_id,likes) values("'+req.body.gonderi_icerik+'","'+req.user.client_id+'",0)');
            connection.query('select * from client inner join post on client.client_id = post.client_id',function(err,rows2){
                if(err){
                    console.log(err);
                }else{
                    res.json(rows2);
                }
                
            })
        });
  });


    app.post('/api/comments/:postID',isLoggedIn,function(req,res){
        var postID = req.params.postID;
        var comment = req.body.commenttext;
        connection.query('insert into comment(text,client_id,post_id) values("'+comment+'","'+req.user.client_id+'","'+postID+'")')


    });


    app.get('/api/viewlikes/:postID',isLoggedIn,function(req,res){
        var postID = req.params.postID;
        var row = [];
      connection.query('select likes from post where post_id=?',[postID], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                    }  
                }
                console.log(row);
                
            }
            res.json(rows);
            
        });
    });

    app.get('/api/like/:postID',isLoggedIn,function(req,res){
        console.log("like post");
        var postID = req.params.postID;
        connection.query("update post set likes=likes+1 where post_id='"+postID+"'")
      
    });



    app.get('/error',function(req,res){

        res.render("error.ejs");

    });

    app.get('/login', function(req, res) {
        
        res.render('login.ejs',{ message: req.flash('loginMessage') });

    });

    app.get('/signup', function(req, res){
        res.render('signup.ejs',{message: req.flash('message')});
      });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash : true 
    }));

    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', 
            failureRedirect : '/login',
            failureFlash : true 
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


};


function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/login');
}

