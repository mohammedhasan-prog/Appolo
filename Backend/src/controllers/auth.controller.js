const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const data = await authService.registerUser(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data
    });
  } catch (error) {
    // Basic error handling for duplicate email or others mapped to 400
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data
    });
  } catch (error) {
    res.status(401).json({ status: 'error', message: error.message });
  }
};

const logout = async (req, res, next) => {
  // In stateless JWT auth, logout is handled client-side by deleting the token.
  // Real-world implementation might blacklist the token in a DB or Redis.
  try {
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json({
      status: 'success',
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe
};
