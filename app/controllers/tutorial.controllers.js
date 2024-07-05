const Tutorial = require("../models/tutorial.model");

const getAll = async (request, response) => {
  try {
    const tutorial = await Tutorial.findAll();
    response.json(tutorial);
  } catch (error) {
    response.status(500).json({ message: error.message || "Error occured!!!" });
  }
};

const create = async (request, response) => {
  const { title, description, published } = request.body;
  try {
    const tutorial = await Tutorial.create({ title, description, published });

    response.status(201).json(tutorial);
  } catch (error) {
    response.status(400).json({ message: error.message || "Error occured" });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Tutorial.destroy({
      where: { tutorial_id: id },
    });

    response
      .status(201)
      .json(`Tutorial with id ${id} is deleted successfully!`);
  } catch (error) {
    response.status(400).json({ message: error.message || "Error occured" });
  }
};

const getPublished = async (request, response) => {
  try {
    const tutorial = await Tutorial.findAll({
      where: { published: true },
    });
    response.json(tutorial);
  } catch (error) {
    response.status(500).json({ message: error.message || "Error occured!!!" });
  }
};

const removeAll = async (request, response) => {
  try {
    await Tutorial.destroy({
      where: {},
      truncate: true,
    });

    response.status(201).json(`All tutorials deleted successfully!`);
  } catch (error) {
    response.status(400).json({ message: error.message || "Error occured" });
  }
};

const getById = async (request, response) => {
  const id = request.params.id;
  try {
    const tutorial = await Tutorial.findOne({
      where: { tutorial_id: id },
    });
    response.json(tutorial);
  } catch (error) {
    response.status(500).json({ message: error.message || "Error occured!!!" });
  }
};

const update = async (request, response) => {
  const newData = request.body;
  const id = request.params.id;
  try {
    const tutorial = await Tutorial.update(newData, {
      where: { tutorial_id: id },
      returning: true,
    });
    response.json(tutorial);
  } catch (error) {
    response.status(500).json({ message: error.message || "Error occured!!!" });
  }
};

module.exports = {
  getAll,
  create,
  remove,
  getPublished,
  removeAll,
  getById,
  update
};
