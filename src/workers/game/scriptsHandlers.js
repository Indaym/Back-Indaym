/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');

/**
 * Get a group of script
 */
const getHandler = (req, res, next) => {
  res.send('scripts');
};

/**
 * Get only one script
 */
const getOneHandler = (req, res, next) => {
  res.send('scripts');
};

/**
 * Create a script
 */
const postHandler = (req, res, next) => {
  res.send('scripts');
};

/**
 * Update an existing script
 */
const putHandler = (req, res, next) => {
  res.send('scripts');
};

/**
 * Delete an existing script
 */
const deleteHandler = (req, res, next) => {
  res.send('scripts');
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};