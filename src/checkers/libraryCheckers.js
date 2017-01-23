/**
 * Created by nicolas on 23/01/17.
 */

const errorBuilder = require('../middleware/errorBuilder');

const urlIdObject = (req, res, next) => {
  if (req.params.idObject === undefined) {
    const error = errorBuilder(404, "idObject not found in the url");
    next(error);
  } else {
    req.app.models.library_object.findOne({ uuid: req.params.idObject })
      .then((result) => {
        if (result === undefined || result.length === 0) {
          const error = errorBuilder(404, "Object '" + req.params.idObject + "' doesn't exist");
          next(error);
        } else
          next();
      })
      .catch((err) => {
        const error = errorBuilder(500, "Unknown error");
        next(error);
      })
  }
};

module.exports = {
  urlIdObject
};