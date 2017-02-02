/**
 * Created by nicolas on 26/01/17.
 */

const errorHandler = require('../middleware/errorHandler');
const paramHandler = require('../middleware/paramHandler');

const postChecker = (req, res, next) => {
  const error = paramHandler.paramError(req.body, {
    published : {
      defaultValue: false,
      type: 'boolean'
    },
    name : {
      type: 'string'
    },
    object : {
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