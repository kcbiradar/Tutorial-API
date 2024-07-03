const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send([
    {"api/tutorials" : "get all Tutorials"},
    {"api/tutorials/:id" : "get Tutorial by id"},
    {"api/tutorials" : "add new Tutorial(This is post method)"},
    {"api/tutorials/:id" : "update Tutorial by id"},
    {"api/tutorials/:id" : "remove Tutorial by id"},
    {"api/tutorials" : "remove all Tutorials (This is delete method)"},
    {"api/tutorials/published" : "find all published Tutorials"},
    {"api/tutorials?title=[kw]" : "find all Tutorials which title contains 'kw' "}
  ]);
});

const tutorialRouter = require("./app/routes/tutorial.routes");

app.use(express.urlencoded({ extended: true }));

app.use("/api/tutorials", tutorialRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
