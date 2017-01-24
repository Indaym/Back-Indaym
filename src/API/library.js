/**
 * Created by nicolas on 20/01/17.
 */

/*
* /library/
* /library/:id
*/

const express = require('express');
const libraryWorkers = require('../workers/libraryHandlers');
const libraryCheckers = require('../checkers/libraryCheckers');

const libraryRouter = express.Router();


libraryRouter.route('/')
  .get(libraryWorkers.getHandler)
  .post(libraryWorkers.postHandler);

libraryRouter.route('/:idObject')
  .get([libraryCheckers.urlIdObject, libraryWorkers.getOneHandler])
  .put([libraryCheckers.urlIdObject, libraryWorkers.putHandler])
  .delete([libraryCheckers.urlIdObject, libraryWorkers.deleteHandler]);

module.exports = {
  libraryRouter
};