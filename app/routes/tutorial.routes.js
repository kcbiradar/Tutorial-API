const express = require("express");

const router = express.Router();

const controllers = require("../controllers/tutorial.controllers");

router
  .route("/")
  .get(controllers.getAll)
  .post(controllers.create)
  .delete(controllers.removeAll);

router.get("/published", controllers.getPublished);

router
  .route("/:id")
  .get(controllers.getById)
  .delete(controllers.remove)
  .put(controllers.update);

module.exports = router;
