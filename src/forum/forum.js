/**
 * Created by djavrell on 13/10/16.
 */

const config = require('../../config/config');
const mongoose = require('mongoose');
const express = require('express');
const subForumRouter = require('./subForum/subForum');
const forumHandler = require('./forumHandler');
const forumModel = require('../schema/forum/forum.schema');


const forumRouter = express.Router(config.routerConfig);

forumRouter.use('/sub_forum', subForumRouter);

forumRouter.route('/')
  .get(forumHandler.getHandler)
  .post(forumHandler.postHandler);

module.exports = forumRouter;
