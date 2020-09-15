const fs = require('fs');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimosCuatro = [];
    const data = require('../data/data.json');
    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimosCuatro = data.ultimosCuatro;
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  getUltimosCuatro() {
    return this.ultimosCuatro;
  }

  atenderTicket(escritorio) {
    if (!this.tickets.length) {
      return 'No hay tickets pendientes';
    }
    const numeroTiecket = this.tickets[0].numero;
    this.tickets.shift();

    const atenderTicket = new Ticket(numeroTiecket, escritorio);
    this.ultimosCuatro.unshift(atenderTicket);
    if (this.ultimosCuatro.length > 4) {
      this.ultimosCuatro.splice(-1, 1); // Borra el ultimo
    }
    console.log('Ultimos cuatro');
    console.log(this.ultimosCuatro);

    this.grabarArchivo();
    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimosCuatro = [];
    this.grabarArchivo();
    console.log('Se a inicializado el sistema');
  }

  grabarArchivo() {
    const jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro: this.ultimosCuatro,
    };

    const jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }

}

module.exports = {
  TicketControl,
}