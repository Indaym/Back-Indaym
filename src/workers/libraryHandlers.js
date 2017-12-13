/**
 * Created by nicolas on 20/01/17.
 */

const waterline = require('waterline');
const paramHandler = require('../middleware/paramHandler');
const errorHandler = require('../middleware/errorHandler');

/**
 * Get a group of library's objects (public or not)
 */
const getHandler = (req, res, next) => {
  req.app.models.library_object.find({
    or: [
      //{ owner: '627ef9c7-9cec-4e4e-8b0c-74e770595f88' },
      { owner: req.user.uuid },
      { published: true }
    ]
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
 * Get only one object from the library
 */
const getOneHandler = (req, res, next) => {
  req.app.models.library_object.findOne({
    uuid: req.params.idObject,
    or: [
      { owner: req.user.uuid },
      { published: true }
    ]
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Library object not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Add an object to the library
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['published', 'name', 'object']);
  createObj.owner = req.user.uuid;
  req.app.models.library_object.create(createObj)
    .then((resu) => {
      res.status(201).json({uuid : resu.uuid});
    })
    .catch((err) => {
      console.log(err.message);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an object in the library
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['published', 'name', 'object']);

  req.app.models.library_object.update({
    uuid: req.params.idObject,
    owner: req.user.uuid
  }, updateObj)
    .then((resu) => {
      if (resu.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this object"));
      else
        res.status(200).json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err.message);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Delete an object from the library
 */
const deleteHandler = (req, res, next) => {
  req.app.models.library_object.destroy({
    uuid: req.params.idObject,
    owner: req.user.uuid
  })
    .then((resu) => {
      if (resu.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this object"));
      else
        res.status(200).json({ status: 'ok' });
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
  deleteHandler
};