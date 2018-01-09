/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');

/**
 * Get a group of scene
 */
const getHandler = (req, res, next) => {
  req.app.models.scene.find({
    gameRef: req.params.idAddedGame
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
 * Get only one scene
 */
const getOneHandler = (req, res, next) => {
  req.app.models.scene.findOne({
    uuid: req.params.idScene
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Scene not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Create a scene
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['name']);
  createObj.gameRef = req.params.idAddedGame;
  req.app.models.scene.create(createObj)
    .then((results) => {
      res.status(201).json({uuid : results.uuid});
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an existing scene
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['name']);
  req.app.models.scene.update({
    uuid: req.params.idScene
  }, updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this Scene"));
      else
        res.status(200).json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Delete an existing scene
 */
const deleteHandler = (req, res, next) => {
  req.app.models.scene.destroy({
    uuid: req.params.idScene
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this Scene"));
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