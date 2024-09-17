const Service = require("../models/service");

class ServiceController {
  static async getAllServices(req, res) {
    try {
      const services = await Service.findAll();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = ServiceController;
