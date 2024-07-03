const getTutorials = "SELECT * FROM tutorials";
const getTutorialById = "SELECT * FROM tutorials WHERE id = $1";
const createTutorial =
  "INSERT INTO tutorials(title,description,published) VALUES($1, $2, $3) RETURNING *";
const searchTutorial = `SELECT * FROM tutorials WHERE title LIKE `;
const getAllPublished = "SELECT * FROM tutorials WHERE published=true";
const removeTutorial = "DELETE FROM tutorials WHERE id = $1";
const removeAllTutorials = "DELETE FROM tutorials";
const updateTutorial =
  "UPDATE tutorials SET title = $1, description =$2, published=$3 WHERE id=$4";

module.exports = {
  getTutorials,
  getTutorialById,
  createTutorial,
  searchTutorial,
  getAllPublished,
  removeTutorial,
  removeAllTutorials,
  updateTutorial,
};
