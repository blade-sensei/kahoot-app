const projectModel = require('../models/project.model');

function getRequiredProjects(project) {
  return new Promise(async (resolve, reject) => {
    try {
      const projectRequiresInformation = await Promise.all(
        project.requires.map((requireProjectId) => {
          return projectModel.findById(requireProjectId);
        })
      );
      Reflect.set(project, 'requires', projectRequiresInformation);
      resolve(project);
    } catch (e) {
      reject(e);
    }
  });
}

function hasRequiredProjects(project) {
  if (!Reflect.has(project, 'requires')) {
    throw new Error('project object has not requires property');
  }
  return project.requires.length > 0;
}
module.exports = {
  getRequiredProjects,
  hasRequiredProjects,
};
