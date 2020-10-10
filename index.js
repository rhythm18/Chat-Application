var express = require('express');

// App Setup

var app = express();
var server = app.listen(9090, function(){
    console.log('listening to requests on port 9090');
});

// Static files

app.use(express.static('public'));