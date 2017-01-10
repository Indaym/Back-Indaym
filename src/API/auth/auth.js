/**
 * Created by djavrell on 10/01/17.
 */

const express = require('express');
const config = require('../../../config/config');
const handlers = require('./authHandlers');

const authRouter = express.Router();


authRouter.route('/login')
  .get(handlers.GetLoginHandler)
  .post(handlers.PostLoginHandler);

authRouter.route('/logout')
  .post(handlers.PostLogoutHandler);

authRouter.route('/me')
  .get(handlers.GetMeHandler)
  .delete(handlers.DeleteMeHandler)
  .put(handlers.PutMeHandler);

authRouter.route('/register')
  .post(handlers.PostRegisterHandler);


module.exports = {
  authRouter,
};

/*

  auth/login        =>  POST    (provide a token)
                        GET     (say if you are logged in or not)
  auth/logout       =>  POST    (destroy the token)
  auth/register     =>  POST    (create an account)
  auth/me           =>  GET     (send information on the connection)
                        DELETE  (delete the account)
                        POST    (update information)

 */