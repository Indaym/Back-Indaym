/**
 * Created by nicolas on 29/01/17.
 */

const express = require('express');
const messagesWorkers = require('../../workers/forum/messagesHandlers');
const messages = require('./messages');

const messagesRouter = express.Router();

messagesRouter.param('idMessage', (req, res, next, value) => {
  console.log('idMessage');
  next();
});

messagesRouter.route('/')
  .get(messagesWorkers.getHandler)
  .post(messagesWorkers.postHandler);

messagesRouter.route('/:idMessage')
  .get(messagesWorkers.getOneHandler)
  .put(messagesWorkers.putHandler)
  .delete(messagesWorkers.deleteHandler);

module.exports = {
  messagesRouter,
};

/**
 * forum/:idForum/topics/:idTopic/messages/
 * forum/:idForum/topics/:idTopic/messages/:idMessage/
 */