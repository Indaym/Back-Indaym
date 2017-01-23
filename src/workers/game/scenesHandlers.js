/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');

/**
 * Get a group of scene
 */
const getHandler = (req, res, next) => {
  res.send('Scenes');
};

/**
 * Get only one scene
 */
const getOneHandler = (req, res, next) => {
  res.send('Scenes');
};

/**
 * Create a scene
 */
const postHandler = (req, res, next) => {
  res.send('Scenes');
};

/**
 * Update an existing scene
 */
const putHandler = (req, res, next) => {
  res.send('Scenes');
};

/**
 * Delete an existing scene
 */
const deleteHandler = (req, res, next) => {
  res.send('Scenes');
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};