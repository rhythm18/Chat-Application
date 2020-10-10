var express = require('express');
var socket = require('socket.io');
// App Setup

var app = express();
var server = app.listen(9090, function(){
    console.log('listening to requests on port 9090');
});

// Static files

app.use(express.static('public'));

//Socket Setup

var io = socket(server);
io.on('connection',function(socket){
    console.log('made socket connection')
});