/**
 * Created by nicolas on 29/01/17.
 */

const waterline = require ("waterline");

const getHandler = (req, res, next) => {
  res.send('topics');
};

const getOneHandler = (req, res, next) => {
  res.send('topics');
};

const postHandler = (req, res, next) => {
  res.send('topics');
};

const putHandler = (req, res, next) => {
  res.send('topics');
};

const deleteHandler = (req, res, next) => {
  res.send('topics');
};


module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
