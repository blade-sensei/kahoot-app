const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  answer: [String],
});
const Question = mongoose.model('question', schema);

const findOneBy = (condition) => {
  return Question.findOne(condition);
};

const findAll = () => {
  return Question.find().exec();
};

module.exports = {
  Question,
  findOneBy,
  findAll,
};
