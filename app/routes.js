var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended:false});
var Base64 = require('js-base64').Base64;


module.exports = function(app,passport) {

    app.get('/',isLoggedIn,function(req,res){
        res.render('index.ejs'); 
    });

    app.get('/', function(req,res){
        res.render('blog/index.ejs'); 
    });    

    app.get('/post',isLoggedIn,function(req,res){
        res.render('post.ejs'); 
    });

    app.get('/search', function(req, res) {
        res.render('search.ejs');   
    });

    app.get('/blog', function(req, res) {
        res.render('blog.ejs');   
    });

    app.get('/contact', function(req, res) {
        res.render('contact.ejs');   
    });   

    app.get('/blog-posts', function(req, res) {
        res.render('blog/posts.ejs');   
    });    

    app.get('/s3creds',function(req,res){
        s3 = {};
        s3.region = process.env.S3REGION;
        s3.accessKeyId = process.env.S3ACCESSKEYID;
        s3.secretAccessKey = process.env.S3SECRETACCESSKEY;
        s3.bucket = process.env.S3BUCKET;
        s3.region = 'eu-central-1';
        res.json(s3); 
    });

     // Get all App Users to populate search results page

     app.get('/api/search',isLoggedIn,function(req,res){
        var row = [];
        connection.query("select * from blogpost", function (err, rows) {
            for (var i in rows) {
                    rows[i].blogpost_content = Base64.decode(rows[i].blogpost_content);
                }
            res.json(rows);
        });
      
    });


    app.get('/api/blogpost/:id',isLoggedIn,function(req,res){
        var blogpost_id = req.params.id;
        connection.query('select * from blogpost where blogpost_id = ?',[blogpost_id], function (err, rows) {
            for (var i in rows) {
                    rows[i].blogpost_content = Base64.decode(rows[i].blogpost_content);
                }
            res.json(rows);
        });
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



     // Get rows for the logged in user's messages
    app.get('/api/messages',isLoggedIn,function(req,res){
        var row = [];
        connection.query('select * from message m inner join client cl on (cl.client_id = m.client_id);', function (err, rows) {        
            res.json(rows);
        });
    });



      // Get row for the logged in user (i.e. client)
    app.get('/api/user',isLoggedIn,function(req,res){
        var row = [];
        connection.query('select * from client where client_id = ?',[req.user.client_id], function (err, rows) {
            
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

    app.post('/api/newmessage', function(req,res){
        console.log(req.body.message);
        debugger;
        connection.query('INSERT INTO message (message_sent_date, message_content, client_id) VALUES (NOW(),"'+req.body.message+'","' +req.user.client_id+'")');
        res.render('index.ejs'); 
    });

    // function for replacing all occurences of a specific substring
    String.prototype.replaceAll = function(target, replacement) {
          return this.split(target).join(replacement);
    };

    app.post('/api/blogPostData', function(req,res){
        var html = req.body.html;
        console.log('this is the blog post string',req.body.html);
        console.log('this is the blog post title',req.body.title);
        encodedhtml = Base64.encode(html);
        console.log("this is the string after base64 encoding", encodedhtml);
        debugger;
        connection.query('INSERT INTO blogpost (post_published_date, title, blogpost_content, client_id) VALUES (NOW(),"'+req.body.title+'","'+encodedhtml+'","'+req.user.client_id+'")');
        res.render('index.ejs'); 
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
        res.render('blog/index.ejs'); 
}

