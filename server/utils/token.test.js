const test = require('ava');
const tokenHelper = require('./token');

test('getToken should return a token with user information encryption', (t) => {
  const token = tokenHelper.getToken({
    uid: '2',
    admin: true,
  });
  const TOKEN_LENGTH = 181;
  t.is(typeof token, 'string', 'token should be string');
  t.is(token.length, TOKEN_LENGTH, 'token length should be 181');
});

test('getToken should throw when user information is missing', (t) => {
  const userInformation = {
    test: '3',
    miss: false,
  };

  const error = t.throws(() => {
    tokenHelper.getToken(userInformation);
  }, Error);

  t.is(typeof error, typeof new Error(), 'token should be string');
  t.is(error.message, 'user object has not uid or admin property');
});
