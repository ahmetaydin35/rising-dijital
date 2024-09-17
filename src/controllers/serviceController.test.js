const Service = require("../models/service");
const ServiceController = require("./serviceController");

jest.mock("../models/service");

describe("ServiceController", () => {
  describe("getAllServices", () => {
    it("should return all services", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockServices = [
        {
          id: 1,
          name: "Standard Shipping",
          description: "Basic shipping service",
          price: 5.0,
        },
        {
          id: 2,
          name: "Express Shipping",
          description: "Fast shipping service",
          price: 10.0,
        },
      ];

      Service.findAll.mockResolvedValue(mockServices);

      await ServiceController.getAllServices(req, res);

      expect(Service.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockServices);
    });

    it("should handle errors", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Service.findAll.mockRejectedValue(new Error("Internal server error"));

      await ServiceController.getAllServices(req, res);

      expect(Service.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
