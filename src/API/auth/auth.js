/**
 * Created by djavrell on 10/01/17.
 */

const express = require('express');
const config = require('../../../config/config');
const passport = require('passport');

const {
  register,
  login,
  logout,
  authenticated,
  refresh,  
} = require('./authHandlers');

const {
  fieldValidation,
  getUser,
  getUserLogin,
  getUserLogout,
  getUserRegister,
  token,
  header,
  trace,
} = require('../../middleware');

const authRouter = express.Router();

authRouter.post(
  '/register',
  [
    fieldValidation.bodyValidation(['username', 'email', 'password']),
    getUser.getUserRegister,
    register,
  ],
);

authRouter.post(
  '/login',
  [
    fieldValidation.bodyValidation(['email', 'password']),
    getUser.getUserFromBody,
    login,
  ],
);

authRouter.post(
  '/logout',
  [
    passport.authenticate('jwt', { session: false }),
    header.getHeader('Authorization', (header) => header.split(' ').slice(1)[0]),
    token.extractToken(),
    getUser.getUserFromToken,
    logout,
  ],
);

authRouter.get(
  '/authenticated',
  [
    passport.authenticate('jwt', { session: false }),
    authenticated,    
  ],
);

const refreshTokenHeaderName = 'refreshToken';
authRouter.get(
  '/refresh',
  [
    header.getHeader(refreshTokenHeaderName),
    token.extractToken(refreshTokenHeaderName),
    token.tokenIsValide(refreshTokenHeaderName),
    getUser.getUserFromToken,
    refresh,
  ],
);

module.exports = {
  authRouter,
};
