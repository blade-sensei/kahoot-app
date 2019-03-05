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

const update = (id, quizz) => {
  return quizzModel.update({ _id: id }, quizz, { new: true });
};

const findById = (id) => {
  return quizzModel.findById(id);
};

module.exports = {
  findAll,
  add,
  findAllByUserId,
  remove,
  update,
  findById,
};
