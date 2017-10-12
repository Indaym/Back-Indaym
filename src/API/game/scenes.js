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
const passport = require('passport');

const scenesRouter = express.Router(config.routerConfig);

scenesRouter.param('idScene', paramsHandlers.idScene);

scenesRouter.route('/')
  .get(passport.authenticate('jwt', { session: false }), scenesWorkers.getHandler)
  .post(passport.authenticate('jwt', { session: false }),
    [
      sceneCheckers.postChecker,
      scenesWorkers.postHandler
    ],
  );

scenesRouter.route('/:idScene')
  .get(passport.authenticate('jwt', { session: false }), scenesWorkers.getOneHandler)
  .put(passport.authenticate('jwt', { session: false }), scenesWorkers.putHandler)
  .delete(passport.authenticate('jwt', { session: false }), scenesWorkers.deleteHandler);

scenesRouter.use('/:idScene/objects', objects.objectsRouter);
scenesRouter.use('/:idScene/scripts', scripts.scriptsRouter);

module.exports = {
  scenesRouter
};