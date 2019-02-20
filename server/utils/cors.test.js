const test = require('ava');
const cors = require('../utils/cors');

test('isPreFlightRequest should be true when request method is OPTIONS', (t) => {
  const mockRequest = {
    method: 'OPTIONS',
  };
  const ispreFlightRequest = cors.isPreFlightRequest(mockRequest);
  t.is(ispreFlightRequest, true, 'ispreFlightRequest should return true');
});

test('isPreFlightRequest should be false when request method is not OPTIONS', (t) => {
  const mockRequest = {
    method: 'OPT',
  };
  const isPreFlightRequest = cors.isPreFlightRequest(mockRequest);
  t.is(isPreFlightRequest, false, 'ispreFlightRequest should return true');
});

test('isPreFlightRequest should be throw when request has not method property', (t) => {
  const mockRequest = {};
  const error = t.throws(() => {
    cors.isPreFlightRequest(mockRequest);
  }, Error);

  t.is(typeof error, typeof new Error(), 'ispreFlightRequest should throw error');
});
