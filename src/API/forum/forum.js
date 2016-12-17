/**
 * Created by djavrell on 13/10/16.
 */

const express = require('express');
const config = require('../../../config/config');

const forumRouter = express.Router();

const forumHandler = require('../../workers/forum/forumHandlers');
const forumParamsHandler = require('./paramsHandlers');
const commonParamsHandler = require('../common/paramsHandlers');

const topics = require('./topics/topics');

/**
 * add the automatics query on differents id
 */
for (let p in forumParamsHandler) {
  if (forumParamsHandler.hasOwnProperty(p)) {
    forumRouter.param(p, forumParamsHandler[p]);
  }
}

forumRouter.param('id_user', commonParamsHandler.idUser);

/**
 * routing
 */
forumRouter.route('/')
  .get(forumHandler.getHandler)
  .post(forumHandler.postHandler);

forumRouter.use('/topics', topics.topicsRouter);

module.exports = {
  forumRouter,
};

/*
  forum/
  forum/topics/
  forum/topics/:id_topics/
  forum/topics/:id_topics/messages/
  forum/topics/:id_topics/messages/:id_messages/
 */