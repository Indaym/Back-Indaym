/**
 * Created by djavrell on 15/10/16.
 */

const config = require('../../../config/config');
const express = require('express');
const handler = require('./messagesHandlers');

const messageRouter = express.Router(config.routerConfig);

messageRouter.route('/')
  .get(handler.getHandler)
  .post(handler.postHandler);

messageRouter.route('/:message_id')
  .get(handler.getIdHandler);


module.exports = messageRouter;