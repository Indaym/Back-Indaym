/**
 * Created by nicolas on 16/09/17.
 */

const errorHandler = require('../../middleware/errorHandler');
const paramHandler = require('../../middleware/paramHandler');

const postChecker = (req, res, next) => {
  next();
};

const uniqueChecker = (req, res, next) => {
  req.app.models.textures.findOne({name: req.file.originalname})
  .then((results) => {
    if (results !== undefined) {
      res.status(409).send('Name `' + results.name + '` already exist');
      return;
    } else {
      next();
    }
  })
  .catch((error) => {
    console.log(error);
    errorHandler.errorExecutor(next);
  });
};

module.exports = {
  uniqueChecker,
  postChecker
};