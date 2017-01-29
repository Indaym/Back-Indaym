/**
 * Created by nicolas on 29/01/17.
 */

const express = require('express');
const topicsWorkers = require('../../workers/forum/topicsHandlers');
const messages = require('./messages');

const topicsRouter = express.Router();

topicsRouter.param('idTopic', (req, res, next, value) => {
  console.log('idTopic');
  next();
});

topicsRouter.route('/')
  .get(topicsWorkers.getHandler)
  .post(topicsWorkers.postHandler);

topicsRouter.route('/:idTopic')
  .get(topicsWorkers.getOneHandler)
  .put(topicsWorkers.putHandler)
  .delete(topicsWorkers.deleteHandler);

topicsRouter.use('/:idTopic/messages/', messages.messagesRouter);

module.exports = {
  topicsRouter,
};

/**
 * forum/:idForum/topics/
 * forum/:idForum/topics/:idTopic/
 */