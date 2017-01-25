/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/:idScene/scripts/
 * /games/:idGame/scenes/:idScene/scripts/:idScript
 */

const express = require('express');
const scriptsWorkers = require('../../workers/game/scriptsHandlers');
const urlCheckers = require('../../checkers/urlCheckers');

const scriptsRouter = express.Router();

scriptsRouter.route('/')
  .get([ ...urlCheckers.chainScene, scriptsWorkers.getHandler ])
  .post([ ...urlCheckers.chainScene, scriptsWorkers.postHandler ]);

scriptsRouter.route('/:idScript')
  .get([ ...urlCheckers.chainScript, scriptsWorkers.getOneHandler ])
  .put([ ...urlCheckers.chainScript, scriptsWorkers.putHandler ])
  .delete([ ...urlCheckers.chainScript, scriptsWorkers.deleteHandler ]);

module.exports = {
  scriptsRouter
};