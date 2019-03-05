const mongoose = require('mongoose');
const User = require('./user.model');
const questionModel  = require('./question.model');

const schema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    default: '',
  },
  owner: String,
  questions: [],
});
const Quizz = mongoose.model('Quizz', schema);

const findOneBy = (condition) => {
  return Quizz.findOne(condition);
};

const findAll = (condition = {}) => {
  if (condition) {
    return Quizz.find(condition).exec();
  }
  return Quizz.find().exec();
};

const add = (quizz) => {
  return new Quizz(quizz).save();
};

const remove = (id) => {
  return Quizz.deleteOne({ _id: id });
};

const update = (condition, instance, options) => {
  return Quizz.findOneAndUpdate(
    condition,
    instance,
    options,
  );
};

const findById = (id) => {
  return Quizz.findById(id);
};

module.exports = {
  Quizz,
  findOneBy,
  findAll,
  add,
  remove,
  update,
  findById,
};
