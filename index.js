var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(9090, function(){
    console.log('listening for requests on port 9090,');
});

// List of restricted/blocked words
var blocked_words = [
    "mad",
    "bad",
    "dog",
    "bitch",
    "ghost",
    
];

// Static files
app.use(express.static('public'));

// Check bad words
function validateMsg(msg) {

    console.log(`validating msg: ${msg}`)

    for (word of blocked_words) {
        
        console.log(`Search blocked words: ${word}`)

        let isBad = msg.includes(word)

        console.log(isBad)

        if(isBad){
            msg = msg.replace(word, "***")
        }
    }

    return msg;
}

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){

        console.log(`Msg Received: ${data}`)
        
        // Check if blocked words were used

        // if(validateMsg(data.message)){
        //     console.log("bad detected")
        //     console.log(word);
        //     // io.sockets.emit('bad', data);
        //     data.message = data.message.replace(word, "****");
        // }

        data.message = validateMsg(data.message)

        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
