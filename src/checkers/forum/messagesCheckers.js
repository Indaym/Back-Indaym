/**
 * Created by nicolas on 31/01/17.
 */

const errorHandler = require('../../middleware/errorHandler');
const paramHandler = require('../../middleware/paramHandler');

const postChecker = (req, res, next) => {
  const error = paramHandler.paramError(req.body, {
    title : {
      type: 'string'
    },
    message: {
      type: 'string'
    }
  });
  if (error !== undefined)
    errorHandler.errorExecutor(next, new errorHandler.errorCustom(400, "Bad Request", ["Wrong parameter " + error]));
  else
    next();
};

const answerTo = (req, res, next) => {
  let answer = req.body.answerTo;
  if (answer === undefined || typeof answer !== 'string') {
    req.body.answerTo = undefined;
    next();
  } else {
    req.app.models.message.findOne({
      uuid: answer,
      topic: req.savedParams.idTopic
    })
      .then((results) => {
        if (results === undefined)
          errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Message not Found", ["The message that you are trying to answer doesn't exit"]));
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
  answerTo
};