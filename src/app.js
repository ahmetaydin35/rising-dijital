const express = require("express");
const { initializeDatabase } = require("./config/database");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
app.use("/", routes);

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
