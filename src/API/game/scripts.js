/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/:idScene/scripts/
 * /games/:idGame/scenes/:idScene/scripts/:idScript
 */

const express = require('express');
const scriptsWorkers = require('../../workers/game/scriptsHandlers');
const idChecker = require('../../checkers/idChecker');

const scriptsRouter = express.Router();

scriptsRouter.route('/')
  .get(scriptsWorkers.getHandler)
  .post(scriptsWorkers.postHandler);

scriptsRouter.route('/:idScript')
  .all(idChecker.setter('idScript', 'script'))
  .get([idChecker.executor, scriptsWorkers.getOneHandler])
  .put([idChecker.executor, scriptsWorkers.putHandler])
  .delete([idChecker.executor, scriptsWorkers.deleteHandler]);

module.exports = {
  scriptsRouter
};