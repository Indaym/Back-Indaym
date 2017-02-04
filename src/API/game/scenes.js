/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/
 * /games/:idGame/scenes/:idScene
 */

const express = require('express');
const scenesWorkers = require('../../workers/game/scenesHandlers');
const paramsHandlers = require('../../checkers/game/paramsHandlers');
const sceneCheckers = require('../../checkers/game/sceneCheckers');
const config = require('../../../config/config');
const objects = require('./objects');
const scripts = require('./scripts');

const scenesRouter = express.Router(config.routerConfig);

scenesRouter.param('idScene', paramsHandlers.idScene);

scenesRouter.route('/')
  .get(scenesWorkers.getHandler)
  .post([
    sceneCheckers.postChecker,
    scenesWorkers.postHandler
  ]);

scenesRouter.route('/:idScene')
  .get(scenesWorkers.getOneHandler)
  .put(scenesWorkers.putHandler)
  .delete(scenesWorkers.deleteHandler);

scenesRouter.use('/:idScene/objects', objects.objectsRouter);
scenesRouter.use('/:idScene/scripts', scripts.scriptsRouter);

module.exports = {
  scenesRouter
};