const PORT = process.env.PORT || 4000;
var express = require('express');
var app = express();

var socket = require('socket.io');

var http = require('http');
var server = http.Server(app);

app.use(express.static('public'));

server.listen(PORT,function(){
    console.log("Chat is running");
});

var io = socket(server);

io.on('connection',function(socket){
    socket.on('chat',function(data){
        socket.broadcast.emit('chat',data);         
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    });
});