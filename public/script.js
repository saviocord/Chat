/*
 * Javascript File
 */

var usr = {
	key : ""
};
 
var socket = io.connect('/');
var name = getName();

$(function(){
	if(!$("#wrapper").hasClass("toggled") && window.innerWidth >= 500) {
		$('#menu-toggle').hide();
	}
	$('#usr').val(name);
	$('#myModal').modal('show');
})
.click(function(){
	if(window.innerWidth < 500 && !$('#myModal').hasClass('in')) {
		if(!$('#menu-toggle').is(':visible')) {
			$("#wrapper").toggleClass("toggled");
			$('#menu-toggle').fadeIn(500);
		}
	}
});

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


socket.on('user add', function (n) {
  $('#myModal').modal('hide');
  $('#name_user').append('<a class="navbar-brand" >'+n+'</a>');
});

socket.on('updateusers', function (data) {
  $('#list_users').empty();
  $.each(data, function (key, value) {
	n = key;
	if (n.length > 30){
		n = key.substring(0, 30);
		n = n+'...';
	}
    $('#list_users').append('<li><a onclick="setNameUser(\'' + n + '\');">' + n + '</a> </li>');
  });
});

socket.on('updatechat', function (username, message) {
  $('#conversation').append('<li><b>' + username + ' disse: </b>' +message+ '</li>');
});

$(function () {
    $('#btn_message').click(function () {
        var message = $('#input_text').val();
        $('#input_text').val('');
        if(usr.key == 'chat-bot'){
			socket.emit('sendchatbot', message);
	    } else {
			socket.emit('sendchat', message);
	    }
    });
});

$(function () {
    $('#input_text').keypress(function (e) {
      if (e.which == 13) {
        var message = $('#input_text').val();
        $('#input_text').val('');
		if(usr.key == 'chat-bot'){
			socket.emit('sendchatbot', message);
		} else {
			socket.emit('sendchat', message);
		}
      }
    });
});

function setNameUser(key) {
	usr.key = key;
	if(usr.key == 'chat-bot'){
		$('#header_chat').text("Mensagem do Chat");
	} else {
		$('#header_chat').text("Mensagem dos Usu?rios");
	}
}


function openMenu() {
	$('#wrapper').toggleClass('toggled');
	$('#menu-toggle').fadeOut(500);
}

function abrirHelp() {
	$('#help').append(help);
	$('#myHelp').modal('show');
}