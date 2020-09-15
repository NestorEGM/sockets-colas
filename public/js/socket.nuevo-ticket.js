const socket = io();

const label = $('#lblNuevoTicket');

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Se perdio la conexion al servidor');
});

socket.on('estadoActual', data => {
  label.text(data.actual);
});

$('button').on('click', () => {
  socket.emit('siguienteTicket', null, siguienteTicket => {
    label.text(siguienteTicket);
  });
});