/**
 * Created by djavrell on 10/01/17.
 */

const express = require('express');
const config = require('../../../config/config');
const handlers = require('./authHandlers');
const passport = require('passport');

const authRouter = express.Router();

authRouter.post('/register', handlers.register);

authRouter.post('/login', handlers.login);

authRouter.post('/logout', handlers.logout);

authRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), handlers.authenticated);

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
