const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');
const projectHelper = require('../utils/project');
const logger = require('../utils/logger');

const getFilteredProjects = (uid, query) => {
  const filterProperties = Object.keys(query);
  let whereConditionRequest = { uid };
  if (filterProperties.length > 0) {
    whereConditionRequest = Object.assign(whereConditionRequest, query);
  }
  Reflect.deleteProperty(whereConditionRequest, 'search');
  return projectModel.findAll(whereConditionRequest);
};

const injectRiquiredProjects = (projects) => {
  return Promise.all(
    projects.map((userProject) => {
      if (projectHelper.hasRequiredProjects(userProject)) {
        return projectHelper.getRequiredProjects(userProject);
      }
      return userProject;
    }),
  );
};

const findAll = () => {
  return userModel.findAll();
};

const getCurrentUser = (authentication) => {
  return userModel.findOneBy({ uid: authentication.id });
};

const getProjects = async (uid, query) => {
  try {
    let projects = await getFilteredProjects(uid, query);
    if (Reflect.has(query, 'search')) {
      projects = projects.filter((project) => {
        return project.title.toLowerCase().includes(query.search.toLowerCase());
      });
    }
    return await injectRiquiredProjects(projects);
  } catch (e) {
    logger.info(e.message);
  }
};

const getByName = (name) => {
  return userModel.findOneBy({ name });
};

const updateProject = async (uid, id, project) => {
  const projectToUpdate = Object.assign({}, project);
  const requiresId = projectToUpdate.requires.map((requiredProject) => {
    return Reflect.get(requiredProject, '_id');
  });
  Reflect.set(project, 'requires', requiresId);
  const requestCondition = {
    uid,
    _id: id,
  };
  const updatedProject = await projectModel.findOneAndUpdate(
    requestCondition,
    projectToUpdate,
    { new: true },
  );
  if (updatedProject) {
    let projectWithRequires = JSON.parse(JSON.stringify(updatedProject));
    if (projectHelper.hasRequiredProjects(updatedProject)) {
      projectWithRequires = await projectHelper.getRequiredProjects(updatedProject);
    }
    return projectWithRequires;
  }
  return updatedProject;
};

module.exports = {
  findAll,
  getCurrentUser,
  getProjects,
  getByName,
  updateProject,
};
