var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require('request');

var TelegramBot = require('node-telegram-bot-api');
var token = '184271644:AAEFUbm7vgYCp--LIUyDuCuILr4srCH21EU';
var USER = '24898886';
var bot = new TelegramBot(token, {polling: {timeout: 1, interval: 100}});

var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};

// https://api.telegram.org/bot184271644:AAEFUbm7vgYCp--LIUyDuCuILr4srCH21EU/sendMessage?chat_id=%2224898886%22&text=%22Hello!%22


app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/index'));
app.use(express.static(__dirname + '/public/dfa'));
app.use(express.static(__dirname + '/public/train'));
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
	        console.log(data['signature']);
	        client.emit('auth_resp', data['signature']);

	        //bot
	        bot.sendMessage(USER, 'Login Activity Detected!', opts)
  .then(function (sended) {
    var chatId = sended.chat.id;
    var messageId = sended.message_id;
    // bot.onReplyToMessage(chatId, messageId, function (message) {
    //   console.log('User is %s years old', message.text);
    // });
  });
	    });
	});
	res.sendFile('dfa.html', {"root": __dirname + '/public/dfa'});
});

app.get('/train', function(req, res, next) {
	io.on('connection', function(client) {  
	    console.log('Client accessing TRAIN...');

	    client.on('join', function(data) {
	        console.log(data);
	        // client.emit('auth_resp', 'Hello from server');

	    client.on('train_req', function(data) {
	        console.log(data['signature']);
	        request.post(
	        	'localhost:8000/train',
	        	{
	        		"data":data
	        	},
	        	function (error, response, body) {
	        		if (!error && response.statusCode == 200) {
            			console.log(body)
            			client.emit('train_resp', body);
        			}
	        	}
	        );
	        // client.emit('train_resp', "Trained!");

	        //bot
	        bot.sendMessage(USER, 'Training Activity Detected!', opts)
  .then(function (sended) {
    var chatId = sended.chat.id;
    var messageId = sended.message_id;
    // bot.onReplyToMessage(chatId, messageId, function (message) {
    //   console.log('User is %s years old', message.text);
    // });
  });
	    });
	});
	res.sendFile('train.html', {"root": __dirname + '/public/train'});
});

server.listen(4200);