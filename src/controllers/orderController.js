const Order = require("../models/order");
const User = require("../models/user");
const Service = require("../models/service");

class OrderController {
  static async createOrder(req, res) {
    const { userId, serviceId, quantity } = req.body;
    try {
      const user = await User.findByPk(userId);
      const service = await Service.findByPk(serviceId);
      if (!user || !service) {
        return res.status(404).json({ error: "User or Service not found" });
      }
      const totalPrice = service.price * quantity;
      if (user.balance < totalPrice) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      const order = await Order.create({
        userId,
        serviceId,
        quantity,
        totalPrice,
      });
      user.balance -= totalPrice;
      await user.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async listOrders(req, res) {
    const { userId } = req.params;
    try {
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: User,
          },
          {
            model: Service,
          },
        ],
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = OrderController;
