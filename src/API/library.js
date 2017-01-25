/**
 * Created by nicolas on 20/01/17.
 */

/**
 * /library/
 * /library/:id
 */

const express = require('express');
const libraryWorkers = require('../workers/libraryHandlers');
const idChecker = require('../checkers/idChecker');

const libraryRouter = express.Router();

libraryRouter.route('/')
  .get(libraryWorkers.getHandler)
  .post(libraryWorkers.postHandler);

libraryRouter.route('/:idObject')
  .all(idChecker.setter('idObject', 'library_object'))
  .get([idChecker.executor, libraryWorkers.getOneHandler])
  .put([idChecker.executor, libraryWorkers.putHandler])
  .delete([idChecker.executor, libraryWorkers.deleteHandler]);


module.exports = {
  libraryRouter
};