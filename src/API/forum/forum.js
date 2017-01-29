/**
 * Created by nicolas on 29/01/17.
 */

const express = require('express');
const forumWorkers = require('../../workers/forum/forumHandlers');
const topics = require('./topics');

const forumRouter = express.Router();

forumRouter.param('idForum', (req, res, next, value) => {
  console.log('idForum');
  next();
});

forumRouter.route('/')
  .get(forumWorkers.getHandler)
  .post(forumWorkers.postHandler);

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