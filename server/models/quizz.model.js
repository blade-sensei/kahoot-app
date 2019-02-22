const mongoose = require('mongoose');
const User = require('./user.model');
const Question = require('./question.model');

const schema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    default: '',
  },
  owner: User,
  created_at: String,
  questions: [Question],
});
const Quizz = mongoose.model('quizz', schema);

const findOneBy = (condition) => {
  return Quizz.findOne(condition);
};

const findAll = () => {
  return v.find().exec();
};

module.exports = {
  Quizz,
  findOneBy,
  findAll,
};
