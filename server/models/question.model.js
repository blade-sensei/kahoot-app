const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  score: String,
  name: String,
  password: String,
  admin: Boolean,
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
