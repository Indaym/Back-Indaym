/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/:idScene/scripts/
 * /games/:idGame/scenes/:idScene/scripts/:idScript
 */

const express = require('express');
const scriptsWorkers = require('../../workers/game/scriptsHandlers');
const scriptsCheckers = require('../../checkers/game/scriptsCheckers');

const scriptsRouter = express.Router();

scriptsRouter.route('/')
  .get(scriptsWorkers.getHandler)
  .post(scriptsWorkers.postHandler);

scriptsRouter.route('/:idScript')
  .get([scriptsCheckers.urlIdScript, scriptsWorkers.getOneHandler])
  .put([scriptsCheckers.urlIdScript, scriptsWorkers.putHandler])
  .delete([scriptsCheckers.urlIdScript, scriptsWorkers.deleteHandler]);

module.exports = {
  scriptsRouter
};