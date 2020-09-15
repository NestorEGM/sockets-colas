const socket = io();

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
const label = $('small')
$('h1').text("Escritorio " + escritorio);

$('button').on('click', () => {
  socket.emit('atenderTicket', { escritorio }, (resp) => {
    if (resp === 'No hay tickets pendientes') {
      label.text('ticket ' + resp);
      alert(resp);
      return;
    }
    label.text('ticket ' + resp.numero);
  });

});