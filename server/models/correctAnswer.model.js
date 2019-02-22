const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const schema = new mongoose.Schema({
  questionId: ObjectId,
  answers: [String],
});

const CorrectAnswer = mongoose.model('correctAnswer', schema);

const findAll = (condition = {}) => {
  if (condition) {
    return CorrectAnswer.find(condition).exec();
  }
  return CorrectAnswer.find().exec();
};

const findById = (id) => {
  return CorrectAnswer.findById(id);
};

const add = (project) => {
  return new CorrectAnswer(project).save();
};

const findOneAndUpdate = (condition, instance, options) => {
  return CorrectAnswer.findOneAndUpdate(
    condition,
    instance,
    options,
  );
};

module.exports = {
  CorrectAnswer,
  findAll,
  findById,
  add,
  findOneAndUpdate,
};
