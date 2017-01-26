/**
 * Created by nicolas on 20/01/17.
 */

const waterline = require('waterline');
const paramHandler = require('../middleware/paramHandler');

/**
 * Get a group of library's objects (public or not)
 */
const getHandler = (req, res, next) => {
  req.app.models.library_object.find({
    or: [
      //{ owner: '627ef9c7-9cec-4e4e-8b0c-74e770595f88' },
      { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
      { published: true }
    ]
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Unexpected Error');
    });
};

/**
 * Get only one object from the library
 */
const getOneHandler = (req, res, next) => {
  req.app.models.library_object.findOne({
    uuid: req.params.idObject,
    or: [
      { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
      { published: true }
    ]
  })
    .then((results) => {
      if (results === undefined)
        res.status(404).send('Library object not found');
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Unexpected Error');
    });
};

/**
 * Add an object to the library
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['published', 'name', 'object']);
  createObj.owner = '4d24a2d2-0ab5-4348-a779-672eb557a6be';
  req.app.models.library_object.create(createObj)
    .then((resu) => {
      res.status(201).json({uuid : resu.uuid});
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send('Unexpected Error')
    });
};

/**
 * Update an object in the library
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['published', 'name', 'object']);

  req.app.models.library_object.update({
    uuid: req.params.idObject,
    owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
  }, updateObj)
    .then((resu) => {
      if (resu.length == 0)
        res.status(403).send('Can\'t update this object');
      else
        res.status(200).end();
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send('Unexpected Error')
    });
};

/**
 * Delete an object from the library
 */
const deleteHandler = (req, res, next) => {
  req.app.models.library_object.destroy({
    uuid: req.params.idObject,
    owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
  })
    .then((resu) => {
      if (resu.length == 0)
        res.status(403).send('Can\'t delete this object');
      else
        res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};