/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');

/**
 * Get a group of script
 */
const getHandler = (req, res, next) => {
  req.app.models.script.find({
    sceneRef: req.params.idScene
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Get only one script
 */
const getOneHandler = (req, res, next) => {
  req.app.models.script.findOne({
    uuid: req.params.idScript
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Script not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Create a script
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['name', 'script']);
  createObj.sceneRef = req.params.idScene;
  req.app.models.script.create(createObj)
    .then((results) => {
      res.status(201).json({uuid : results.uuid});
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an existing script
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['name', 'script']);
  req.app.models.script.update({
    uuid: req.params.idScript
  }, updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this Script"));
      else
        res.status(200).json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Delete an existing script
 */
const deleteHandler = (req, res, next) => {
  req.app.models.script.destroy({
    uuid: req.params.idScript
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this Script"));
      else
        res.status(200).json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};