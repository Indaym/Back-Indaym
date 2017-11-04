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
    fieldValidation.validationField,
    getUser.getUserRegister,
    register,
  ],
);

authRouter.post(
  '/login',
  [
    fieldValidation.validationField,
    getUser.getUserLogin,
    login,
  ],
);

authRouter.post(
  '/logout',
  [
    passport.authenticate('jwt', { session: false }),
    header.getHeader('Authorization', (header) => header.split(' ').slice(1)[0]),
    token.extractToken,
    getUser.getUserLogout,
    logout,
  ],
);

authRouter.get(
  '/authenticated',
  [
    passport.authenticate('jwt', { session: false }),
    fieldValidation.validationField,
    authenticated,    
  ],
);

authRouter.get(
  '/refresh',
  [
    header.getHeader('Authorization', (header) => header.split(' ').slice(1)[0]),
    refresh,
  ],
);

module.exports = {
  authRouter,
};

/*

  auth/login          =>  POST    (provide a token)
    202/400
  auth/logout         =>  POST    (destroy the token)
    202/403
  auth/register       =>  POST    (create an account)
    201/403
  auth/authenticated  =>  GET    (create an account)
    20(0|2)/401

 */
