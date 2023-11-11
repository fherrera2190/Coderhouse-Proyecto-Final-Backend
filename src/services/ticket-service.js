class TicketService {
    constructor(dao) {
      this.dao = new dao();
    }
    async getTickets() {
      return await this.dao.get();
    }
    async createTicket() {
      return await this.dao.createTicket();
    }
    async getTicketById(cid) {
      return await this.dao.getTicketById(cid);
    }
    async addTicket(products) {}
  
  }
  module.exports = TicketService;