var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/index'));
app.use(express.static(__dirname + '/public/dfa'));
// app.use(express.static(path.join(__dirname, '/public')));
app.get('/index', function(req, res, next) {
	// io.on('connection', function(client) {  
	//     console.log('Client accessing INDEX...');

	//     client.on('join', function(data) {
	//         console.log(data);
	//     });
	// });
	res.sendFile('index.html', {"root": __dirname + '/public/index'});
});

app.get('/dfa', function(req, res, next) {
	io.on('connection', function(client) {  
	    console.log('Client accessing DFA...');

	    client.on('join', function(data) {
	        console.log(data);
	        // client.emit('auth_resp', 'Hello from server');
	    });

	    client.on('auth_req', function(data) {
	        console.log(data['username']);
	        client.emit('auth_resp', data['password']);
	    });
	});
	res.sendFile('dfa.html', {"root": __dirname + '/public/dfa'});
});

server.listen(4200);