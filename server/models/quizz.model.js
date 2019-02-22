const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    default: '',
  },
  owner: User,
  created_at: String,
  questions: Array,
});
const User = mongoose.model('users', schema);

const findOneBy = (condition) => {
  return User.findOne(condition);
};

const findAll = () => {
  return User.find().exec();
};

module.exports = {
  User,
  findOneBy,
  findAll,
};
