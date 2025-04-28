const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    successResponse(res, user, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};
