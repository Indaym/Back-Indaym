/**
 * Created by nicolas on 30/01/17.
 */

const errorHandler = require('../../middleware/errorHandler');
const paramHandler = require('../../middleware/paramHandler');

const postChecker = (req, res, next) => {
  const error = paramHandler.paramError(req.body, {
    title : {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  });
  if (error !== undefined)
    errorHandler.errorExecutor(next, new errorHandler.errorCustom(400, "Bad Request", ["Wrong parameter " + error]));
  else
    next();
};

module.exports = {
  postChecker
};