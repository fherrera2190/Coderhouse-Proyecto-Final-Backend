const Ticket = require("../dto/Ticket.dto");

class TicketService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getTickets() {
    return await this.dao.get();
  }
  async create(ticket) {
    const ticketDto = new Ticket(ticket);
    return await this.dao.createTicket(ticketDto);
  }
  async getTicketById(cid) {
    return await this.dao.getTicketById(cid);
  }
}
module.exports = TicketService;
