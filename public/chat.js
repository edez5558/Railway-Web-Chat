var socket = io.connect("https://railway-web-chat-production.up.railway.app:4000");

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });

    output.innerHTML += '<p class="message me"><strong>' + handle.value + ':</strong>'
                     + message.value + '</p>';

    message.value = "";
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});

socket.on('chat',function(data){
    feedback.innerHTML = "";

    output.innerHTML += '<p class="message"><strong>' + data.handle + ':</strong>'
                     + data.message + '</p>';

})

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

