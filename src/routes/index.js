const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/serviceController");
const UserController = require("../controllers/userController");
const OrderController = require("../controllers/orderController");
const DatabaseController = require("../controllers/databaseController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", (req, res) => {
  res.send("Rising Dijital");
});

router.get("/services", authenticateToken, ServiceController.getAllServices);

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.post("/orders", authenticateToken, OrderController.createOrder);
router.get("/orders/:userId", authenticateToken, OrderController.listOrders);

router.get("/all-data", authenticateToken, DatabaseController.getAllData);

module.exports = router;
