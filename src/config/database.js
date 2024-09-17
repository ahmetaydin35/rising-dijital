const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_STORAGE || "database.sqlite",
});

async function addDummyData() {
  const Service = require("../models/service");
  const User = require("../models/user");
  await Service.bulkCreate([
    {
      id: 1,
      name: "Standard Shipping",
      description: "Basic shipping service with average delivery time.",
      price: 5.0,
    },
    {
      id: 2,
      name: "Express Shipping",
      description: "Faster delivery service with premium charges.",
      price: 15.0,
    },
    {
      id: 3,
      name: "Gift Wrapping",
      description: "Special gift wrapping service for special occasions.",
      price: 2.5,
    },
    {
      id: 4,
      name: "Installation Service",
      description: "Professional installation service for electronic devices.",
      price: 30.0,
    },
  ]);
  await User.create({
    firstName: "Ahmet",
    lastName: "Aydın",
    email: "ahmet@example.com",
    password: await bcrypt.hash("ahmet123", 10),
    balance: 100.0,
  });
}

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("Database synchronized.");
    if (process.env.NODE_ENV === "development") {
      await addDummyData();
      console.log("Dummy data added.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, initializeDatabase };
