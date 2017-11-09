/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/:idScene/objects/
 * /games/:idGame/scenes/:idScene/objects/:idObject
 */

const express = require('express');
const objectsWorkers = require('../../workers/game/objectsHandlers');
const paramsHandlers = require('../../checkers/game/paramsHandlers');
const objectCheckers = require('../../checkers/game/objectCheckers');
const config = require('../../../config/config');
const passport = require('passport');

const objectsRouter = express.Router(config.routerConfig);

objectsRouter.param('idObject', paramsHandlers.idObject);

objectsRouter.route('/')
  .get( objectsWorkers.getHandler)
  .post(
    [
      objectCheckers.postChecker,
      objectCheckers.libraryChecker,
      objectCheckers.textureChecker,
      objectsWorkers.postHandler
    ],
  );

objectsRouter.route('/:idObject')
  .get(objectsWorkers.getOneHandler)
  .put(
    [
      objectCheckers.libraryChecker,
      objectCheckers.textureChecker,
      objectsWorkers.putHandler
    ]
  ).delete(objectsWorkers.deleteHandler);

module.exports = {
  objectsRouter
};