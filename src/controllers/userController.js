const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class UserController {
  static async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        balance: 100.0,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;
