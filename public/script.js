
//função para fazer a busca dos nomes aleatorios fica aqui
function getName() {
  return 'Nome do Usuario';
}

var name = getName();

var socket = io.connect('/');

socket.on('connect', function () {
  socket.emit('adduser', name);
});

/*
//arquivo scrips que estava na index.html
$(function () {
    // when the client hits ENTER on their keyboard
    $(document).ready(function(){
      $('#myModal').modal('show');
      $('a').click(function(){
        $('#myModal').modal('show');
      });
    });
}); */