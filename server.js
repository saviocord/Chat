var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', function(req, res) {
	var dir = '/views';
	var file = '/index.html';
	res.sendFile( __dirname + dir + file );
});

app.listen(8081, function() {
	console.log('Executando o servidor...');
});
