const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', { actual: ticketControl.getUltimoTicket(), ultimosCuatro: ticketControl.getUltimosCuatro() });

    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario',
            });
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        // client.broadcast.emit('estadoActual', { ultimosCuatro: ticketControl.getUltimosCuatro() });
        client.broadcast.emit('ultimosCuatro', { ultimosCuatro: ticketControl.getUltimosCuatro() });
    });

});