class TicketResponse {
  constructor(ticket) {
    this.code = ticket.code;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.purchase_datatime = ticket.createdAt;
  }
}

module.exports = TicketResponse;
