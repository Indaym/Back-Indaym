/**
 * Created by nicolas on 29/01/17.
 */

const waterline = require ("waterline");
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');

/**
 * Get a group of forums
 */
const getHandler = (req, res, next) => {
  req.app.models.forum.find()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Get only one forum
 */
const getOneHandler = (req, res, next) => {
  req.app.models.forum.findOne({
    uuid: req.params.idForum
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Forum not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Create a forum
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['title', 'description']);
  req.app.models.forum.create(createObj)
    .then((results) => {
      res.status(201).json({uuid : results.uuid});
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an existing forum
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['title', 'description']);
  req.app.models.forum.update({
    uuid: req.params.idForum
  },updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this forum"));
      else
        res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Delete an existing forum
 */
const deleteHandler = (req, res, next) => {
  req.app.models.forum.destroy({
    uuid: req.params.idForum
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this forum"));
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
