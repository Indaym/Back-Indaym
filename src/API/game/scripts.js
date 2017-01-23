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
  .all(scriptsCheckers.urlIdScript)
  .get(scriptsWorkers.getOneHandler)
  .put(scriptsWorkers.putHandler)
  .delete(scriptsWorkers.deleteHandler);

module.exports = {
  scriptsRouter
};