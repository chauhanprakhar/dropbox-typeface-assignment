const express = require('express');
const { registerUser } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/register',
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

module.exports = router;
