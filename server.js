var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bot = require('./public/chat-bot.js');

const usernames = {};
usernames['chat-bot']='chat-bot';

app.use('/public', express.static('public'));
app.use('/js', express.static(__dirname + '/public/bootstrap/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/public/bootstrap/css'));

app.get('/', function(req, res) {

	var dir = '/views';
	var file = '/index.html';
	res.sendFile( __dirname + dir + file );
});

io.on('connection', function(socket){
	console.log('Usuario conectado: '+socket.id);
    socket.on('chat message', function(msg, msg_pvd){
		console.log('Usuario:'+socket.id+'  msg:'+msg+'  msg_pvd:'+msg_pvd);
		if (msg) {
			io.emit('chat message','mensagem publica: '+ msg);
		} else {
			io.to(socket.id).emit('chat message','mensagem privada: '+ msg_pvd);
		}
    });
	socket.on('adduser', (username) => {
		if (usernames[username]){
			console.log('usuario ja existe');
			io.to(socket.id).emit('user exist',username);
		} else {
			socket.username = username;
			usernames[username] = username;
			io.to(socket.id).emit('user add',username);
			io.emit('updateusers',usernames);
			console.log('add user:'+username);
		}
	});
	socket.on('disconnect', () => {
		delete usernames[socket.username];
		io.emit('updateusers', usernames);
		console.log('Usuario desconectado: '+socket.id);
    });
	socket.on('sendchatbot', (message) => {
        io.to(socket.id).emit('updatechat', socket.username, message);
		var reply = bot.respondTo(message);
		//colocando delay para a resposta do chat
		setTimeout(function() { 
			io.to(socket.id).emit('updatechatbot', 'chat', reply)
		},300);
		
    });
	socket.on('sendchat', (message) => {
        io.emit('updatechat', socket.username, message);
    });
});

http.listen(8081, function() {
	console.log('Executando o servidor...');
});
