const projectModel = require('../models/project.model');
const projectHelper = require('../utils/project');

const findAll = () => {
  return projectModel.findAll();
};

const findById = async (id) => {
  const project = await projectModel.findById(id);
  if (project) {
    const projectCopy = JSON.parse(JSON.stringify(project));
    if (projectHelper.hasRequiredProjects(projectCopy)) {
      return projectHelper.getRequiredProjects(projectCopy);
    }
  }
  return project;
};

const add = (project) => {
  return projectModel.add(project);
};

module.exports = {
  findAll,
  findById,
  add,
};
