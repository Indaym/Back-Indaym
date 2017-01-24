/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/
 * /games/:idGame
 */

const express = require('express');
const gamesWorkers = require('../../workers/game/gamesHandlers');
const gamesCheckers = require('../../checkers/game/gamesCheckers');
const scenes = require('./scenes');

const gamesRouter = express.Router();

gamesRouter.route('/')
  .get(gamesWorkers.getHandler)
  .post(gamesWorkers.postHandler);

gamesRouter.route('/:idGame')
  .get([gamesCheckers.urlIdGame, gamesWorkers.getOneHandler])
  .put([gamesCheckers.urlIdGame, gamesWorkers.putHandler])
  .delete([gamesCheckers.urlIdGame, gamesWorkers.deleteHandler]);

gamesRouter.use('/:idGame/scenes/', scenes.scenesRouter);

module.exports = {
  gamesRouter
};