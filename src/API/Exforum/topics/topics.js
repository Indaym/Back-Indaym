/**
 * Created by djavrell on 16/12/16.
 */

const config = require('../../../../config/config');

const express = require('express');
const topicsRouter = express.Router();

const topicsHandlers = require('../../../workers/forum/topicsHandlers');

const messages = require('./messages/messages');

topicsRouter.route('/')
  .get(topicsHandlers.getAllTopics)
  .post(topicsHandlers.newTopics);

topicsRouter.route('/:id_topics')
  .get(topicsHandlers.getTopics)
  .put(topicsHandlers.updateTopics)
  .delete(topicsHandlers.deleteTopics);

topicsRouter.use('/messages', messages.messagesRouter);

module.exports = {
  topicsRouter,
};
