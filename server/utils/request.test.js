const test = require('ava');
const requestHelper = require('./request');

test('hasRequiredParameters should be true when body request has the required parameters', (t) => {
  const requiredParameters = ['username', 'password'];
  const bodyRequest = {
    username: 'usernameTest',
    password: 'passwordTest',
  };

  t.is(
    requestHelper.hasRequiredParameters(requiredParameters, bodyRequest),
    true,
    'hasRequiredParameters should be true'
  );
});

test('hasRequiredParameters should be false when body request has not the required parameters', (t) => {
  const requiredParameters = ['username', 'password'];
  const bodyRequest = {
    test: 'usernameTest',
    password: 'passwordTest',
  };

  t.is(
    requestHelper.hasRequiredParameters(requiredParameters, bodyRequest),
    false,
    'hasRequiredParameters should be false'
  );
});

test.todo('requiredParameters should handle TypeError in parameters');
