/**
 * Created by djavrell on 15/10/16.
 */

const express = require('express');
const config = require('../../../config/config');

const messagesRouter = require('../messages/messages');
const handler = require('./handler');

const subForumRouter = express.Router(config.routerConfig);
subForumRouter.use('/:sub_forum_id/messages', messagesRouter);

subForumRouter.param('sub_forum_id', );

subForumRouter.route('/')
  .get(handler.subForumHandler.getHandler)
  .post(handler.subForumHandler.postHandler);

subForumRouter.route('/:sub_forum_id')
  .get(handler.subForumHandler.getIdHandler);


module.exports = subForumRouter;