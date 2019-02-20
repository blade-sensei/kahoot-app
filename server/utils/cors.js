const isPreFlightRequest = (request) => {
  if (request.method) {
    return request.method === 'OPTIONS';
  }
  throw new Error('request object has not method property');
};

module.exports = { isPreFlightRequest };
