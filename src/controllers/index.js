class IndexController {
  static async getIndex(req, res) {
    try {
      res.status(200).json({ message: "Hello, world!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = IndexController;
