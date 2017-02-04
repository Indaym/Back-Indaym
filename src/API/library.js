/**
 * Created by nicolas on 20/01/17.
 */

/**
 * /library/
 * /library/:id
 */

const express = require('express');
const libraryWorkers = require('../workers/libraryHandlers');
const paramsHandlers = require('../checkers/library/paramsHandlers');
const libraryCheckers = require('../checkers/library/libraryCheckers');

const libraryRouter = express.Router();

libraryRouter.param('idObject', paramsHandlers.idObject);

libraryRouter.route('/')
  .get(libraryWorkers.getHandler)
  .post([
    libraryCheckers.postChecker,
    libraryWorkers.postHandler
  ]);

libraryRouter.route('/:idObject')
  .get(libraryWorkers.getOneHandler)
  .put(libraryWorkers.putHandler)
  .delete(libraryWorkers.deleteHandler);

module.exports = {
  libraryRouter
};