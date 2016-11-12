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
});


