const Tutorial = require("../models/tutorial.model");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const tutorial = new Tutorial({
    title: request.body.title,
    description: request.body.description,
    published: request.body.published || false,
  });

  Tutorial.create(tutorial)
    .then((result) => {
      response.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      response.send(error);
    });
};

exports.findOne = (request, response) => {
  Tutorial.findById(request.params.id)
    .then((result) => {
      response.status(200).send(result.rows);
    })
    .catch((error) => {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found Tutorial with id ${request.params.id}`,
        });
      } else {
        response.status(500).send({
          message: "Error retrieving Tutorial with id " + request.params.id,
        });
      }
    });
};

exports.findAll = (request, response) => {
  Tutorial.getAll(request.query.title)
    .then((result) => {
      if (result.rowCount === 0) {
        response.status(200).send({
          message: "No match found!!",
        });
        return;
      }
      response.status(200).send(result.rows);
    })
    .catch((error) => {
      response.status(500).send({
        message:
          error.message || "Some error occured while retrieving tutorials.",
      });
    });
};

exports.findAllPublished = (request, response) => {
  Tutorial.getAllPublished()
    .then((result) => {
      response.status(200).send(result.rows);
    })
    .catch((error) => {
      response.status(500).send({
        message:
          error.message || "Some error occured while retrieving tutorials.",
      });
    });
};

exports.delete = (request, response) => {
  Tutorial.remove(request.params.id)
    .then(() => {
      response.status(200).send({
        message: `Tutorial was deleted successfully`,
      });
    })
    .catch((error) => {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found Tutorial with id ${request.params.id}.`,
        });
      } else {
        response.status(500).send({
          message: error.message,
        });
      }
    });
};

exports.deleteAll = (request, response) => {
  Tutorial.deleteAll()
    .then(() => {
      response.status(200).send({
        message: "All tutorials were deleted successfully!",
      });
    })
    .catch((error) => {
      response.status(500).send({
        message:
          error.message || "Some error occured while removing all tutorials.",
      });
    });
};

exports.update = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Tutorial.updateById(request.params.id, new Tutorial(request.body))
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error) => {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found Tutorial with id ${request.params.id}`,
        });
      } else {
        response.status(500).send({
          message: `Error updating Tutorial with id " + ${request.params.id}`,
        });
      }
    });
};
