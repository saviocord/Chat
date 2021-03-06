/*
 * Javascript File
 */

var talkingTo = {
	key : ""
};
var yourName = "";
var socket = io.connect('/');
var name = getName();

$(function(){
	if(!$("#wrapper").hasClass("toggled") && window.innerWidth >= 500) {
		$('#menu-toggle').hide();
	} else {
		$("#menu-bottom").toggleClass("toggled");
		$("#menu-top").toggleClass("toggled");
		$("#page-content-wrapper").toggleClass("toggled");
	}
	$('#usr').val(name);
	$('#myModal').modal('show');
})
.click(function(){
	if(window.innerWidth < 500 && !$('#myModal').hasClass('in')) {
		if(!$('#menu-toggle').is(':visible')) {
			$("#wrapper").toggleClass("toggled");
			$("#menu-bottom").toggleClass("toggled");
			$("#menu-top").toggleClass("toggled");
			$("#page-content-wrapper").toggleClass("toggled");
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

//Login
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
  yourName = n;
  //$('#name_user').append('<a class="navbar-brand" >'+n+'</a>');
});

socket.on('updateusers', function (data) {
  $('#list_users').empty();
  $.each(data, function (key, value) {
	n = key;
	if (n.length > 30){
		n = n.substring(0, 30);
		n = n+'...';
	}
	$('#list_users').append('<li><a onclick="setNameUser(\'' + n + '\');clearConversation();">' + n + '</a> </li>');
  });
});

socket.on('updatechat', function (username, message) {
	if (talkingTo.key != 'chat-bot') {
		$('#conversation').append('<tr><td><b>' + username+ ' disse: </b>' +message+ '</td></tr>');
	}
});

socket.on('updatechatbot', function (username, message) {
  $('#conversation').append('<tr><td><b>' + username+ ' disse: </b>' +message+ '</td></tr>');
});

$(function () {
    $('#btn_message').click(function () {
        var message = $('#input_text').val();
        $('#input_text').val('');
        if(talkingTo.key == 'chat-bot'){
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
				if(talkingTo.key == 'chat-bot'){
					socket.emit('sendchatbot', message);
				} else {
					socket.emit('sendchat', message);
				}
      }
    });
});

function setNameUser(key) {
	$('#header_chat').empty();
	talkingTo.key = key;
	if(talkingTo.key == 'chat-bot'){
		$('#header_chat').text("Mensagens do Chat");
	} else {
		$('#header_chat').text("Mensagens dos Usuarios");
	}
}

function clearConversation() {
	$('#conversation').empty();
}


function openMenu() {
	$('#wrapper').toggleClass('toggled');
	$("#menu-bottom").toggleClass("toggled");
	$("#menu-top").toggleClass("toggled");
	$("#page-content-wrapper").toggleClass("toggled");
	$('#menu-toggle').fadeOut(500);
}

function abrirHelp() {
	$('#help').append(help);
	$('#myHelp').modal('show');
}