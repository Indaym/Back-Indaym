/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/:idScene/scripts/
 * /games/:idGame/scenes/:idScene/scripts/:idScript
 */

const express = require('express');
const scriptsWorkers = require('../../workers/game/scriptsHandlers');
const paramsHandlers = require('../../checkers/game/paramsHandlers');
const scriptCheckers = require('../../checkers/game/scriptCheckers');
const config = require('../../../config/config');

const scriptsRouter = express.Router(config.routerConfig);

scriptsRouter.param('idScript', paramsHandlers.idScript);

scriptsRouter.route('/')
  .get(scriptsWorkers.getHandler)
  .post([
    scriptCheckers.postChecker,
    scriptsWorkers.postHandler
  ]);

scriptsRouter.route('/:idScript')
  .get(scriptsWorkers.getOneHandler)
  .put(scriptsWorkers.putHandler)
  .delete(scriptsWorkers.deleteHandler);

module.exports = {
  scriptsRouter
};