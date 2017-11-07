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
} = require('../../middleware');

const gamesRouter = express.Router(config.routerConfig);

const compose = [
]

gamesRouter.param('idGame', paramsHandlers.idGame);

gamesRouter.route('/')
  .get([
    passport.authenticate('jwt', { session: false }),
    header.getHeader('Authorization', (header) => header.split(' ').slice(1)[0]),
    token.extractToken(),
    token.tokenIsValide('Authorization'),
    getUser.getUserFromToken,
    gamesWorkers.getHandler
  ])
  .post(passport.authenticate('jwt', { session: false }),
    [
      gameCheckers.postChecker,
      gamesWorkers.postHandler
    ],
  );

gamesRouter.route('/:idGame')
  .get(passport.authenticate('jwt', { session: false }), gamesWorkers.getOneHandler)
  .put(passport.authenticate('jwt', { session: false }), gamesWorkers.putHandler)
  .delete(passport.authenticate('jwt', { session: false }), gamesWorkers.deleteHandler);

gamesRouter.use('/:idGame/scenes', scenes.scenesRouter);

module.exports = {
  gamesRouter
};