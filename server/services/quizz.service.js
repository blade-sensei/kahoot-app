const quizzModel = require('../models/quizz.model');

const findAll = () => {
  return quizzModel.findAll();
};

const add = (project) => {
  return quizzModel.add(project);
};

const findAllByUserId = (uid) => {
  return quizzModel.findAll({ owner: uid });
};

const remove = (id) => {
  return quizzModel.remove(id);
}

module.exports = {
  findAll,
  add,
  findAllByUserId,
  remove,
};
