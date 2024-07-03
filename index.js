const express = require("express");

const pool = require("./app/models/db");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Visit api/tutorial");
});

const tutorialRouter = require("./app/routes/tutorial.routes");

app.use(express.urlencoded({ extended: true }));

app.use("/api/tutorials", tutorialRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
