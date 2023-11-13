const ticketModel = require("./models/ticket.model");

class Ticket {
  constructor(model) {
    this.ticketModel = model;
  }

  async getTickets() {
    return await ticketModel.find({});
  }

  async getTicketById(tid) {
    return await ticketModel.findById({ _id: tid });
  }

  async createTicket(ticket) {

    return await ticketModel.create(ticket);
  }
}

module.exports = Ticket;
