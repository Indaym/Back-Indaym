/**
 * Created by nicolas on 29/01/17.
 */

const express = require('express');
const messagesWorkers = require('../../workers/forum/messagesHandlers');
const messagesCheckers = require('../../checkers/forum/messagesCheckers');
const paramsHandlers = require('../../checkers/forum/paramsHandlers');
const config = require('../../../config/config');

const messagesRouter = express.Router(config.routerConfig);

messagesRouter.param('idMessage', paramsHandlers.idMessage);

messagesRouter.route('/')
  .get(messagesWorkers.getHandler)
  .post([messagesCheckers.postChecker, messagesCheckers.answerTo, messagesWorkers.postHandler]);

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