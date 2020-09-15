const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const lblTickets = [
  lblTicket1,
  lblTicket2,
  lblTicket3,
  lblTicket4,
];
const lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

socket.on('estadoActual', (data) => {
  actualizaHtml(data.ultimosCuatro);
});

socket.on('ultimosCuatro', data => {
  const audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  actualizaHtml(data.ultimosCuatro);
});

function actualizaHtml(ultimosCuatro) {
  for (let i = 0; i < ultimosCuatro.length; i++) {
    lblTickets[i].text('Ticket ' + ultimosCuatro[i].numero);
    lblEscritorios[i].text('Escritorio ' + ultimosCuatro[i].escritorio);
  }
}