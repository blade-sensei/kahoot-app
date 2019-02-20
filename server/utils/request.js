const OBJECT_ID_LENGTH = 24;

const hasRequestRequiredParameters = (requiredParameters, requestBody) => {
  return requiredParameters.every((parameter) => {
    return Object.prototype.hasOwnProperty.call(requestBody, parameter);
  });
};

const isIdObjectIDType = (id) => {
  return (id.length === OBJECT_ID_LENGTH);
};

module.exports = {
  hasRequiredParameters: hasRequestRequiredParameters,
  isIdObjectIDType,
};
