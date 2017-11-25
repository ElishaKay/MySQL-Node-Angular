// config/database.js

// uncomment before pushing to git

module.exports = {
    'connection': {
        'host': process.env.HOST, // localde iseniz bu , local değilse ip adresini yazınız .
        'user': process.env.USER, // kullanıcı adı 
        'password': process.env.PASSWORD, // şifreniz 
        'database': process.env.DATABASE // database ismi .
    },
	'database': process.env.DATABASE,
    
};


	
