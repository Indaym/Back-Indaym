/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');

/**
 * Get a group of object
 */
const getHandler = (req, res, next) => {
  res.send('Objects');
};

/**
 * Get only one object
 */
const getOneHandler = (req, res, next) => {
  res.send('Objects');
};

/**
 * Create a object
 */
const postHandler = (req, res, next) => {
  res.send('Objects');
};

/**
 * Update an existing object
 */
const putHandler = (req, res, next) => {
  res.send('Objects');
};

/**
 * Delete an existing object
 */
const deleteHandler = (req, res, next) => {
  res.send('Objects');
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};