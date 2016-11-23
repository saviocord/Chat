/*
 * Javascript File
 */

var socket = io.connect('/');

function getName() {
  var name = list_names[Math.floor(Math.random() * list_names.length)];
  return name;
}

var disable_btn_login = function() {
  name = $('#usr').val();
  if(name == '') {
    $('#btn_login').addClass('disabled');
  } else {
    $('#btn_login').removeClass('disabled');
  }
}

var login = function() {
  name = $('#usr').val();
  if(name != '') {
    socket.emit('adduser', name);
  }
	socket.on('user exist', function (usr) {
		$('#erro-login').empty().append(
		'<div class="alert alert-danger alert-dismissable fade in">' +
			'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
			'<strong>Aviso!</strong> Usuario ' + usr + ' já existe.' +
		'</div>');
		throw err;
	});
	if(!err) {
		$('#myModal').modal('hide');
	}
}

var name = getName();

$(function(){
	$('#usr').val(name);
	$('#myModal').modal('show');
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});
});

socket.on('user add', function (n) {
  $('#myModal').modal('hide');
  $('#name_user').append('<a class="navbar-brand" >'+n+'</a>');
});

socket.on('updateusers', function (data) {
  $('#list_users').empty();
  $.each(data, function (key, value) {
    $('#list_users').append('<li><a href="#">' + key + '</a> </li>');
  });
});

socket.on('updatechat', function (username, message) {
  $('#conversation').append($('<li>').text(username+' diz: '+message));
});

$(function () {
    $('#btn_message').click(function () {
      var message = $('#input_text').val();
      $('#input_text').val('');
      socket.emit('sendchat', message);
    });
});

$(function () {
    $('#input_text').keypress(function (e) {
      if (e.which == 13) {
        var message = $('#input_text').val();
        $('#input_text').val('');
        socket.emit('sendchat', message);
      }
    });
});
