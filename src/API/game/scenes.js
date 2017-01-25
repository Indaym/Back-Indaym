/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/
 * /games/:idGame/scenes/:idScene
 */

const express = require('express');
const scenesWorkers = require('../../workers/game/scenesHandlers');
const urlCheckers = require('../../checkers/urlCheckers');
const objects = require('./objects');
const scripts = require('./scripts');

const scenesRouter = express.Router();

scenesRouter.route('/')
  .get([ urlCheckers.idGame, scenesWorkers.getHandler ])
  .post([ urlCheckers.idGame, scenesWorkers.postHandler ]);

scenesRouter.route('/:idScene')
  .get([ ...urlCheckers.chainScene, scenesWorkers.getOneHandler ])
  .put([ ...urlCheckers.chainScene, scenesWorkers.putHandler ])
  .delete([ ...urlCheckers.chainScene, scenesWorkers.deleteHandler ]);

scenesRouter.use('/:idScene/objects', objects.objectsRouter);
scenesRouter.use('/:idScene/scripts', scripts.scriptsRouter);

module.exports = {
  scenesRouter
};