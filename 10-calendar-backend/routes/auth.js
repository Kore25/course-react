/**
 * Rutas de Usuarios / Auth
 * Host: /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, tokenUser } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/filedsValidators');
const { validateToken } = require('../middlewares/validateToken.js');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Email is require').isEmail(),
    check('password', 'Password is require and most be more than 6 characters').isLength({ min: 6 }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is require').isEmail(),
    check('password', 'Password is require').not().isEmpty(),
    fieldsValidator,
  ],
  loginUser
);

router.get(
  '/renew',
  validateToken,
  tokenUser
);

module.exports = router;