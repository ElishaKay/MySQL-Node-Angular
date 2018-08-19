module.exports = {
    'connection': {
        'host': process.env.HOST, // localde iseniz bu , local değilse ip adresini yazınız .
        'user': process.env.USER, // kullanıcı adı 
        'password': process.env.PASSWORD, // şifreniz 
        'database': process.env.DATABASE // database ismi .
    },

    // The second connection is for the db that you want to segment your audience from
    // and to pull data from for custom reports
    
    'connection2': {
        'host': process.env.HOST2, // localde iseniz bu , local değilse ip adresini yazınız .
        'user': process.env.USER2, // kullanıcı adı 
        'password': process.env.PASSWORD2, // şifreniz 
        'database': process.env.DATABASE2 // database ismi .
    }
};


