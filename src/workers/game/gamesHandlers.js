/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');

/**
 * Get a group of games
 */
const getHandler = (req, res, next) => {
  res.send('Games');
};

/**
 * Get only one game
 */
const getOneHandler = (req, res, next) => {
  res.send('Games');
};

/**
 * Create a game
 */
const postHandler = (req, res, next) => {
  res.send('Games');
};

/**
 * Update an existing game
 */
const putHandler = (req, res, next) => {
  res.send('Games');
};

/**
 * Delete an existing game
 */
const deleteHandler = (req, res, next) => {
  res.send('Games');
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};