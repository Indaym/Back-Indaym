/**
 * Created by nicolas on 16/09/17.
 */

const errorHandler = require('../../middleware/errorHandler');
const paramHandler = require('../../middleware/paramHandler');

const postChecker = (req, res, next) => {
  next();
};

module.exports = {
  postChecker
};