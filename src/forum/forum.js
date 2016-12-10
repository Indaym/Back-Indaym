/**
 * Created by djavrell on 13/10/16.
 */

const express = require('express');

const config = require('../../config/config');
const forumHandler = require('./forumHandler');
const forumRouter = express.Router(config.routerConfig);

forumRouter.route('/')
  .get(forumHandler.getHandler)
  .post(forumHandler.postHandler);

module.exports = forumRouter;
