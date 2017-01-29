/**
 * Created by nicolas on 29/01/17.
 */

const waterline = require ("waterline");

const getHandler = (req, res, next) => {
  res.send('forum');
};

const getOneHandler = (req, res, next) => {
  res.send('forum');
};

const postHandler = (req, res, next) => {
  res.send('forum');
};

const putHandler = (req, res, next) => {
  res.send('forum');
};

const deleteHandler = (req, res, next) => {
  res.send('forum');
};


module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
