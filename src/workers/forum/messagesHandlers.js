/**
 * Created by nicolas on 29/01/17.
 */

const waterline = require ("waterline");

const getHandler = (req, res, next) => {
  res.send('messages');
};

const getOneHandler = (req, res, next) => {
  res.send('messages');
};

const postHandler = (req, res, next) => {
  res.send('messages');
};

const putHandler = (req, res, next) => {
  res.send('messages');
};

const deleteHandler = (req, res, next) => {
  res.send('messages');
};


module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
