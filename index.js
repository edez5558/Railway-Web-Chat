var express = require('express');
var socket = require('socket.io');

var app = express();

const PORT = process.env.PORT || 4000;
var server = app.listen(PORT,function(){
    console.log("Listen in port 4000");
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
    socket.on('chat',function(data){
        socket.broadcast.emit('chat',data);         
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    });
});