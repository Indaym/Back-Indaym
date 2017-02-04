/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/
 * /games/:idGame
 */

const express = require('express');
const gamesWorkers = require('../../workers/game/gamesHandlers');
const paramsHandlers = require('../../checkers/game/paramsHandlers');
const gameCheckers = require('../../checkers/game/gameCheckers');
const config = require('../../../config/config');
const scenes = require('./scenes');

const gamesRouter = express.Router(config.routerConfig);

gamesRouter.param('idGame', paramsHandlers.idGame);

gamesRouter.route('/')
  .get(gamesWorkers.getHandler)
  .post([
    gameCheckers.postChecker,
    gamesWorkers.postHandler
  ]);

gamesRouter.route('/:idGame')
  .get(gamesWorkers.getOneHandler)
  .put(gamesWorkers.putHandler)
  .delete(gamesWorkers.deleteHandler);

gamesRouter.use('/:idGame/scenes', scenes.scenesRouter);

module.exports = {
  gamesRouter
};