/**
 * Created by nicolas on 23/01/17.
 */

const errorBuilder = require('../../middleware/errorBuilder');

const urlIdGame = (req, res, next) => {
  next();
};

module.exports = {
  urlIdGame
};