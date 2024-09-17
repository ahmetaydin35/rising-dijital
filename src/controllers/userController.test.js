const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserController = require("./userController");
const User = require("../models/user");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../models/user");

describe("UserController", () => {
  describe("register", () => {
    it("should hash the password before saving the user", async () => {
      const req = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      bcrypt.hash.mockResolvedValue("hashedPassword");
      User.create.mockResolvedValue({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "hashedPassword",
        balance: 100.0,
      });

      await UserController.register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(User.create).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "hashedPassword",
        balance: 100.0,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "hashedPassword",
        balance: 100.0,
      });
    });
  });

  describe("login", () => {
    it("should compare the password with the hashed password", async () => {
      const req = {
        body: {
          email: "john.doe@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const user = {
        id: 1,
        email: "john.doe@example.com",
        password: "hashedPassword",
      };
      bcrypt.compare.mockResolvedValue(true);
      User.findOne.mockResolvedValue(user);
      jwt.sign.mockReturnValue("fakeToken");

      await UserController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "john.doe@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "fakeToken" });
    });
  });
});
