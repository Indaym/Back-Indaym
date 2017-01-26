/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/
 * /games/:idGame
 */

const express = require('express');
const gamesWorkers = require('../../workers/game/gamesHandlers');
const urlCheckers = require('../../checkers/urlCheckers');
const gameCheckers = require('../../checkers/gameCheckers');
const scenes = require('./scenes');

const gamesRouter = express.Router();

gamesRouter.route('/')
  .get(gamesWorkers.getHandler)
  .post([gameCheckers.postChecker, gamesWorkers.postHandler]);

gamesRouter.route('/:idGame')
  .get([ urlCheckers.idGame, gamesWorkers.getOneHandler ])
  .put([ urlCheckers.idGame, gamesWorkers.putHandler ])
  .delete([ urlCheckers.idGame, gamesWorkers.deleteHandler ]);

scenes(gamesRouter, '/:idGame/scenes');

module.exports = {
  gamesRouter
};