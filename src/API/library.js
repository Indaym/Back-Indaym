/**
 * Created by nicolas on 20/01/17.
 */

/**
 * /library/
 * /library/:id
 */

const express = require('express');
const libraryWorkers = require('../workers/libraryHandlers');
const urlCheckers = require('../checkers/urlCheckers');
const libraryCheckers = require('../checkers/libraryCheckers');

const libraryRouter = express.Router();

libraryRouter.route('/')
  .get(libraryWorkers.getHandler)
  .post([libraryCheckers.postChecker, libraryWorkers.postHandler]);

libraryRouter.route('/:idObject')
  .get([urlCheckers.libraryIdObject, libraryWorkers.getOneHandler])
  .put([urlCheckers.libraryIdObject, libraryWorkers.putHandler])
  .delete([urlCheckers.libraryIdObject, libraryWorkers.deleteHandler]);


module.exports = {
  libraryRouter
};