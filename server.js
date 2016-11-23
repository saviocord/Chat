var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const usernames = {};

app.use('/public', express.static('public'));
app.use('/js', express.static(__dirname + '/public/bootstrap/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/public/bootstrap/css'));

app.get('/', function(req, res) {

	var dir = '/views';
	var file = '/index.html';
	res.sendFile( __dirname + dir + file );
});

function respondTo(input) {
	
	input = input.toLowerCase();
	console.log('input: '+input);	
	if(RegExp('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)').test(input))
		return "um... hi?";
		
	if(RegExp('what[^ ]* up').test(input) || RegExp('sup').test(input) || RegExp('how are you').test(input))
		return "this github thing is pretty cool, huh?";
		
	if(RegExp('l(ol)+').test(input) || RegExp('(ha)+(h|$)').test(input) || RegExp('lmao').test(input))
		return "what's so funny?";
		
	if(RegExp('^no+(\\s|!|\\.|$)').test(input))
		return "don't be such a negative nancy :(";
		
	if(RegExp('(cya|bye|see ya|ttyl|talk to you later)').test(input))
		return ["alright, see you around", "good teamwork!"];
		
	if(RegExp('(dumb|stupid|is that all)').test(input))
		return ["hey i'm just a proof of concept", "you can make me smarter if you'd like"];
		
	if(input == 'noop')
		return;
		
	return input + " what?";
}

io.on('connection', function(socket){
	console.log('Usuario conectado: '+socket.id);
    socket.on('chat message', function(msg, msg_pvd){
		console.log('Usuario:'+socket.id+'  msg:'+msg+'  msg_pvd:'+msg_pvd);
		if (msg) {
			io.emit('chat message','mensagem publica: '+ msg);
		} else{
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
	socket.on('sendchat', (message) => {
        io.emit('updatechat', socket.username, message);
		var reply = respondTo(message);
		//colocando delay para a resposta do chat
		var latency = Math.floor((Math.random() * 400) + 300);
		setTimeout(function() { 
			io.to(socket.id).emit('updatechat', 'chat ', reply)
		},latency);
		
    });
});



http.listen(8081, function() {
	console.log('Executando o servidor...');
});
