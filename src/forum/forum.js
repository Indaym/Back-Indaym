/**
 * Created by djavrell on 13/10/16.
 */

const config = require('../../config/config');
const mongoose = require('mongoose');
const express = require('express');
const subForumRouter = require('./subForum/subForum');

const forumModel = require('../schema/forum/forum.schema');


const forumRouter = express.Router(config.routerConfig);

forumRouter.use('/sub_forum', subForumRouter);

const getHandler = (req, res, next) => {
  res.send('welcome to the forum\n');
  next();
};

const postHandler = (req, res, next) => {
  res.send(req.params);
  next();
};


forumRouter.route('/')
  .get(getHandler)
  .post(postHandler);

module.exports = forumRouter;