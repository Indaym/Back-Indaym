/**
 * Created by djavrell on 15/10/16.
 */

const config = require('../../../config/config');
const express = require('express');
const messagesRouter = require('../messages/messages');
const handler = require('./subForumHandler');


const subForumRouter = express.Router(config.routerConfig);
subForumRouter.use('/:sub_forum_id/messages', messagesRouter);

subForumRouter.route('/')
  .get(handler.getHandler)
  .post(handler.postHandler);

subForumRouter.route('/:sub_forum_id')
  .get(handler.getIdHandler);


module.exports = subForumRouter;