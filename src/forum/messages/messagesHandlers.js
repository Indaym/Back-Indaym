/**
 * Created by djavrell on 15/10/16.
 */

const mongoose = require('mongoose');

const message = require('../../schema/forum/message.schema');


const getHandler = (req, res, next) => {
  res.send('messages API\n');
  next();
};

const getIdHandler = (req, res, next) => {
  res.send('sub_forum_id: ' + req.params.sub_forum_id + ' > message_id: ' + req.params.message_id + '\n');
  next();
};

const postHandler = (req, res, next) => {
  next();
};

module.exports = {
  getHandler,
  getIdHandler,
  postHandler
};
