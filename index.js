const express = require("express");
const sequelize = require("./app/config/config");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (request, response) => {
  response.json("Wel come to tutorial application");
});

const tutorialRouter = require("./app/routes/tutorial.routes");

app.use("/api/tutorials", tutorialRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database connection has been established successfully.`);
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
