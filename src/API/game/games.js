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
const passport = require('passport');
const {
  token,
  getUser,
  header,
  trace,
  fieldValidation,
  queryParams,
} = require('../../middleware');

const getUserFromToken = require('../../helpers').getUserFromToken;

const gamesRouter = express.Router(config.routerConfig);

gamesRouter.param('idGame', paramsHandlers.idGame);

gamesRouter.route('/')
  .get([
    queryParams.orderBy,
    queryParams.owner,
    queryParams.pagination,
    gamesWorkers.getHandler,
  ])
  .post(
    [
      gameCheckers.postChecker,
      gamesWorkers.postHandler
    ],
  );

gamesRouter.get('/publicGames', []);

gamesRouter.get('/count', gamesWorkers.count);

gamesRouter.post('/:idGame/add', [
  gamesWorkers.addOne,
])

gamesRouter.route('/:idGame')
  .get(gamesWorkers.getOneHandler)
  .put(gamesWorkers.putHandler)
  .delete(gamesWorkers.deleteHandler);

gamesRouter.use('/:idGame/scenes', scenes.scenesRouter);

module.exports = {
  gamesRouter
};