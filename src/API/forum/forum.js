/**
 * Created by nicolas on 29/01/17.
 */

const express = require('express');
const forumWorkers = require('../../workers/forum/forumHandlers');
const forumCheckers = require('../../checkers/forum/forumCheckers');
const paramsHandlers = require('../../checkers/forum/paramsHandlers');
const topics = require('./topics');

const forumRouter = express.Router();

forumRouter.param('idForum', paramsHandlers.idForum);

forumRouter.route('/')
  .get(forumWorkers.getHandler)
  .post([forumCheckers.postChecker, forumWorkers.postHandler]);

forumRouter.route('/:idForum')
  .get(forumWorkers.getOneHandler)
  .put(forumWorkers.putHandler)
  .delete(forumWorkers.deleteHandler);

forumRouter.use('/:idForum/topics/', topics.topicsRouter);

module.exports = {
  forumRouter,
};

/**
 * forum/
 * forum/:idForum/
 */