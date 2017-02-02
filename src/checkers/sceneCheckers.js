/**
 * Created by nicolas on 27/01/17.
 */

const paramHandler = require('../middleware/paramHandler');

const postChecker = (req, res, next) => {
  const error = paramHandler.paramError(req.body, {
    name : {
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