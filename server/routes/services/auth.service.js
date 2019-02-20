const userModel = require('../models/user.model');
const tokenHelper = require('../utils/token');

const login = async ({ username, password }) => {
  const user = await userModel.findOneBy({
    username,
    password,
  });
  if (!user) {
    return user;
  }
  const token = tokenHelper.getToken(user);
  return {
    username: user.username,
    logged: true,
    token,
  };
};

module.exports = {
  login,
};
