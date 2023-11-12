const ticketModel = require("./models/ticket.model");

class Ticket {
  constructor(model) {
    this.userModel = model;
  }

  async getTickets() {
    try {
      return await ticketModel.find({});
    } catch (error) {
      return new Error(error);
    }
  }

  async getTicketById(tid) {
    try {
      return await ticketModel.findById({ _id: tid });
    } catch (error) {
      return new Error(error);
    }
  }


  async addTicket(ticket) {
    try {
      return await ticketModel.create(user);
    } catch (error) {
      return new Error(error);
    }
  }

  async deleteUser(ticket) {
    try {
      return await ticketModel.findOneAndDelete({ _id: tid });
    } catch (error) {
      return new Error(error);
    }
  }
}

module.exports = User;
