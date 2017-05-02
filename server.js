/*
Creates a basic socket.io app and prints the current date and time 
in intervals of 15 seconds. This file contains the socket.io code
*/

var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

//use the connection and disconnect events to count the number of active 
//users on site, and update all users with the current count.
io.on('connection', function(socket) {  
	//send client welcome message
    socket.emit('message', {'message': 'Hello World'});
});

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

// Send current time every 15 secs
setInterval(sendTime, 15000);

app.listen(3000, function(){
	console.log("App is runing on port Number 3000"); 
	console.log("Try this Url in Browser :- http://localhost:3000/");
});
