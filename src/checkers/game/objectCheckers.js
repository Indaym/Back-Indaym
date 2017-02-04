/**
 * Created by nicolas on 26/01/17.
 */

const errorHandler = require('../../middleware/errorHandler');
const paramHandler = require('../../middleware/paramHandler');

const postChecker = (req, res, next) => {
  const error = paramHandler.paramError(req.body, {
    name : {
      type: 'string'
    },
    object: {
      defaultValue: '{}',
      type: 'string'
    }
  });
  if (error !== undefined)
    errorHandler.errorExecutor(next, new errorHandler.errorCustom(400, "Bad Request", ["Wrong parameter " + error]));
  else
    next();
};

const libraryChecker = (req, res, next) => {
  if (req.body.objectRef === undefined)
    next();
  else {
    req.app.models.library_object.findOne({
      uuid: req.body.objectRef,
      or: [
        { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
        { published: true }
      ]
    })
      .then((results) => {
        if (results === undefined)
          errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "ObjectRef not found"));
        else
          next();
      })
      .catch((err) => {
        console.log(err);
        errorHandler.errorExecutor(next);
      });
  }
};

module.exports = {
  postChecker,
  libraryChecker
};
