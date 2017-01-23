/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/
 * /games/:idGame/scenes/:idScene
 */

const express = require('express');
const scenesWorkers = require('../../workers/game/scenesHandlers');
const scenesCheckers = require('../../checkers/game/scenesCheckers');
const objects = require('./objects');
const scripts = require('./scripts');

const scenesRouter = express.Router();

scenesRouter.route('/')
  .get(scenesWorkers.getHandler)
  .post(scenesWorkers.postHandler);

scenesRouter.route('/:idScene')
  .all(scenesCheckers.urlIdScene)
  .get(scenesWorkers.getOneHandler)
  .put(scenesWorkers.putHandler)
  .delete(scenesWorkers.deleteHandler);

scenesRouter.use('/:idScene/objects', objects.objectsRouter);
scenesRouter.use('/:idScene/scripts', scripts.scriptsRouter);

module.exports = {
  scenesRouter
};