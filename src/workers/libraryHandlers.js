/**
 * Created by nicolas on 20/01/17.
 */

const waterline = require('waterline');

// Get a group of library's objects (public or not)
const getHandler = (req, res, next) => {
  req.app.models.library_object.find()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Unexpected Error');
    });
};

// Get only one object from the library
const getOneHandler = (req, res, next) => {
  req.app.models.library_object.findOne().where({ uuid: req.params.idObject })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Unexpected Error');
    });
};

// Add an object to the library
const postHandler = (req, res, next) => {
  ({name, published, object} = req.body);
  published = JSON.parse(published);
  if (published === undefined || typeof published !== "boolean")
    published = false;
  if (name === undefined || object === undefined)
    res.status(500).send('Wrong values');
  const obj = req.app.models.library_object.create({
    name: name,
    published: published,
    object: object,
    owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
  })
    .then((resu) => {
      res.status(201).json({uuid : resu.uuid});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Unexpected Error')
    });
};

// Update an object in the library
const putHandler = (req, res, next) => {
  next();
};

// Delete an object from the library
const deleteHandler = (req, res, next) => {
  next();
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};