/**
 * Created by nicolas on 29/01/17.
 */

const waterline = require ("waterline");
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');

const getHandler = (req, res, next) => {
  req.app.models.message.find({
    topic: req.savedParams.idTopic
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

const getOneHandler = (req, res, next) => {
  req.app.models.message.findOne({
    topic: req.savedParams.idTopic,
    uuid: req.savedParams.idMessage
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Message not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['title', 'message', 'answerTo']);
  createObj.topic = req.savedParams.idTopic;
  createObj.owner = '4d24a2d2-0ab5-4348-a779-672eb557a6be';
  req.app.models.message.create(createObj)
    .then((results) => {
      res.status(201).json({uuid : results.uuid});
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['title', 'description', 'up', 'down']);
  req.app.models.message.update({
    topic: req.savedParams.idTopic,
    uuid: req.savedParams.idMessage
  },updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this message"));
      else
        res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

const deleteHandler = (req, res, next) => {
  req.app.models.message.destroy({
    uuid: req.savedParams.idMessage
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this message"));
      else
        res.status(200).end();
    })
    .catch((err) => {
      errorHandler.errorExecutor(next);
    });
};


module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
