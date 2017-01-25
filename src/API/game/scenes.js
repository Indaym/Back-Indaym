/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/
 * /games/:idGame/scenes/:idScene
 */

const express = require('express');
const scenesWorkers = require('../../workers/game/scenesHandlers');
const idChecker = require('../../checkers/idChecker');
const objects = require('./objects');
const scripts = require('./scripts');

const scenesRouter = express.Router();

scenesRouter.route('/')
  .get(scenesWorkers.getHandler)
  .post(scenesWorkers.postHandler);

scenesRouter.route('/:idScene')
  .all(idChecker.setter('idScene', 'scene'))
  .get([idChecker.executor, scenesWorkers.getOneHandler])
  .put([idChecker.executor, scenesWorkers.putHandler])
  .delete([idChecker.executor, scenesWorkers.deleteHandler]);

scenesRouter.use('/:idScene/objects', objects.objectsRouter);
scenesRouter.use('/:idScene/scripts', scripts.scriptsRouter);

module.exports = {
  scenesRouter
};