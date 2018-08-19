module.exports = {
    'connection': {
        'host': process.env.HOST,
        'user': process.env.USER,  
        'password': process.env.PASSWORD, 
        'database': process.env.DATABASE 
    },

    // The second connection is for the db that you want to segment your audience from
    // and to pull data from for custom reports
    
    'connection2': {
        'host': process.env.HOST2, 
        'user': process.env.USER2, 
        'password': process.env.PASSWORD2, 
        'database': process.env.DATABASE2
    }
};


