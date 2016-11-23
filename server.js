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

var input;

function match(regex) {
	console.log('regex: '+regex);
	return new RegExp(regex).test(input);
}
	
function respondTo(input) {
	
	input = input.toLowerCase();
	console.log('input: '+input);	
	if(match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)'))
		return "um... hi?";
		
	if(match('what[^ ]* up') || match('sup') || match('how are you'))
		return "this github thing is pretty cool, huh?";
		
	if(match('l(ol)+') || match('(ha)+(h|$)') || match('lmao'))
		return "what's so funny?";
		
	if(match('^no+(\\s|!|\\.|$)'))
		return "don't be such a negative nancy :(";
		
	if(match('(cya|bye|see ya|ttyl|talk to you later)'))
		return ["alright, see you around", "good teamwork!"];
		
	if(match('(dumb|stupid|is that all)'))
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

		io.to(socket.id).emit('updatechat', 'chat ', reply);
		
    });
});



http.listen(8081, function() {
	console.log('Executando o servidor...');
});
