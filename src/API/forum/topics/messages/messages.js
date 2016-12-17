/**
 * Created by djavrell on 15/10/16.
 */

const config = require('../../../../../config/config');
const express = require('express');

const messages = express();
const messagesRouter = express.Router();

const handler = require('../../../../workers/forum/messagesHandlers');

messagesRouter.route('/')
  .get(handler.getHandler)
  .post(handler.postHandler);

messagesRouter.route('/:id_messages')
  .get(handler.getIdHandler);

module.exports = {
  messagesRouter,
};
