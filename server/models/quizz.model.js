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

const add = (quizz) => {
  return new Quizz(quizz).save();
};

module.exports = {
  Quizz,
  findOneBy,
  add,
};
