/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/
 * /games/:idGame
 */

const express = require('express');
const gamesWorkers = require('../../workers/game/gamesHandlers');
const idChecker = require('../../checkers/idChecker');
const scenes = require('./scenes');

const gamesRouter = express.Router();

gamesRouter.route('/')
  .get(gamesWorkers.getHandler)
  .post(gamesWorkers.postHandler);

gamesRouter.route('/:idGame')
  .all(idChecker.setter('idGame', 'game'))
  .get([idChecker.executor, gamesWorkers.getOneHandler])
  .put([idChecker.executor, gamesWorkers.putHandler])
  .delete([idChecker.executor, gamesWorkers.deleteHandler]);

gamesRouter.use('/:idGame/scenes/', scenes.scenesRouter);

module.exports = {
  gamesRouter
};