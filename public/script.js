var name;

function getName() {
  var name = list_names[Math.floor(Math.random() * list_names.length)];
  return name;
}

name = getName();

var socket = io.connect('/');

//arquivo scrips que estava na index.html
$(function () {
    $(document).ready(function(){
	  $('#usr').val(name);
      $('#myModal').modal('show');
      $('a').click(function(){
        $('#myModal').modal('show');
      });
	  $('#btn_login').click(function(){
		name = $('#usr').val();
		if(name != '') {
			//$('#myModal').modal('hide');
			socket.emit('adduser', name);
		}
	  });
    });
});

socket.on('user exist', function (n) {
  alert('usuario '+n+' ja existe.');
});

socket.on('user add', function (n) {
  $('#myModal').modal('hide');
  $('#name_user').append('<a class="navbar-brand" >'+n+'</a>');
});

socket.on('updateusers', function (data) {
  $('#list_users').empty();
  $.each(data, function (key, value) {
    $('#list_users').append('<li class="list-group-item"> <span class="badge">1</span> <a href="#">'+key+'</a> </li>');
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


