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
        { owner: req.user.uuid },
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

const textureChecker = (req, res, next) => {
  if (req.body.textureRef === undefined)
    next();
  else {
    req.app.models.textures.findOne({
      uuid: req.body.textureRef,
      or: [
        { owner: req.user.uuid },
      ]
    })
      .then((results) => {
        if (results === undefined)
          errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "id of texture not found"));
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
  libraryChecker,
  textureChecker
};
