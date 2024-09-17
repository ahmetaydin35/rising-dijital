const User = require("../models/user");
const Service = require("../models/service");
const Order = require("../models/order");

class DatabaseController {
  static async getAllData(req, res) {
    try {
      const users = await User.findAll();
      const services = await Service.findAll();
      const orders = await Order.findAll();

      res.status(200).json({
        users,
        services,
        orders,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = DatabaseController;
