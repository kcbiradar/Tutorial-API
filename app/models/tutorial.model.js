const pool = require("./db");
const queries = require("./queries");

const Tutorial = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial) => {
  return new Promise((resolve, reject) => {
    const { title, description, published } = newTutorial;

    if(!title) {
      reject("Title should not be null, Please provide tutorial name");
      return;
    }

    pool.query(
      queries.createTutorial,
      [title, description, published],
      (error, result) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(result);
        }
      }
    );
  });
};

Tutorial.findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getTutorialById, [id], (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        if(result.rowCount === 0) {
          reject({kind : 'not_found'});
          return;
        }
        resolve(result);
      }
    });
  });
};

Tutorial.getAll = (title) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.searchTutorial + `'%${title}%';`, (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(result);
      }
    });
  });
};

Tutorial.getAllPublished = () => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getAllPublished, (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(result);
      }
    });
  });
};

Tutorial.remove = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.removeTutorial, [id], (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        if (result.rowCount === 0) {
          reject({ kind: "not_found" });
          return;
        }
        resolve(result);
      }
    });
  });
};

Tutorial.deleteAll = () => {
  return new Promise((resolve, reject) => {
    pool.query(queries.removeAllTutorials, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

Tutorial.updateById = (id, tutorial) => {
  return new Promise((resolve, reject) => {
    const { title, description, published } = tutorial;
    pool.query(
      queries.updateTutorial,
      [title, description, published, id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.rowCount === 0) {
            reject({ kind: "not_found" });
            return;
          }
          resolve(result);
        }
      }
    );
  });
};

module.exports = Tutorial;
