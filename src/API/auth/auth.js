/**
 * Created by djavrell on 10/01/17.
 */

const express = require('express');
const config = require('../../../config/config');
const handlers = require('./authHandlers');
const passport = require('passport');

const middelware = require('../../middleware');
const trace = middelware.trace;

const authRouter = express.Router();

authRouter.post(
  '/register',
  [
    middelware.fieldValidation.validationField,
    middelware.getUser.getUserRegister,
    handlers.register,
  ],
);

authRouter.post(
  '/login',
  [
    middelware.fieldValidation.validationField,
    middelware.getUser.getUserLogin,
    handlers.login,
  ],
);

authRouter.post(
  '/logout',
  [
    passport.authenticate('jwt', { session: false }),
    middelware.header.getHeader('Authorization', (header) => header.split(' ').slice(1)[0]),
    middelware.token.extractToken,
    middelware.getUser.getUserLogout,
    handlers.logout,
  ],
);

authRouter.get(
  '/authenticated',
  [
    passport.authenticate('jwt', { session: false }),
    middelware.fieldValidation.validationField,
    handlers.authenticated,    
  ],
);

authRouter.get(
  '/refresh',
  [
    middelware.header.getHeader('Authorization', (header) => header.split(' ').slice(1)[0]),
    handlers.refresh,
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
