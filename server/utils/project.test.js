const test = require('ava');
const projectHelper = require('./project');

test('hasRequiredProjects should return true when projects has not required projects', (t) => {
  const project = {
    _id: '5ba0f2a2b41162092b59d900',
    title: 'project 2b',
    description: 'This is the description for project 2b',
    status: 'not started',
    data: 'https://',
    uid: '2',
    requires: ['5ba0f22cb0ad9d0908ece391'],
  };
  t.is(
    projectHelper.hasRequiredProjects(project),
    true,
    'hasRequiredProject should be true when requires array is not empty'
  );
});

test('hasRequiredProjects should return false when projects has not required projects', (t) => {
  const project = {
    _id: '5ba0f2a2b41162092b59d900',
    title: 'project 2b',
    description: 'This is the description for project 2b',
    status: 'not started',
    data: 'https://',
    uid: '2',
    requires: [],
  };
  t.is(
    projectHelper.hasRequiredProjects(project),
    false,
    'hasRequiredProject should be false when requires array is empty'
  );
});

test('hasRequiredProjects should throw error when project has not requires property', (t) => {
  const project = {
    _id: '5ba0f2a2b41162092b59d900',
    title: 'project 2b',
    description: 'This is the description for project 2b',
    status: 'not started',
    data: 'https://',
    uid: '2',
  };

  const error = t.throws(() => {
    projectHelper.hasRequiredProjects(project);
  }, Error);

  t.is(typeof error, typeof new Error());

  t.is(error.message, 'project object has not requires property');
});
