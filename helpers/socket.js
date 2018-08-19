
module.exports = (io, app) =>

    
    io.sockets.on('connection', function(socket){

    messages = [];
    users = [];
    connections = [];

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

    function updateMessages(messages){
        // io.sockets.emit('new message', messages);
    } 
});