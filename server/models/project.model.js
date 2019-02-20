const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'not started',
  },
  data: {
    type: String,
    default: 'http://',
  },
  uid: String,
  requires: Array,
});

const Project = mongoose.model('projects', schema);

const findAll = (condition = {}) => {
  if (condition) {
    return Project.find(condition).exec();
  }
  return Project.find().exec();
};

const findById = (id) => {
  return Project.findById(id);
};

const add = (project) => {
  return new Project(project).save();
};

const findOneAndUpdate = (condition, instance, options) => {
  return Project.findOneAndUpdate(
    condition,
    instance,
    options,
  );
};

module.exports = {
  Project,
  findAll,
  findById,
  add,
  findOneAndUpdate,
};
