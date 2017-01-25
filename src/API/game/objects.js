/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/:idScene/objects/
 * /games/:idGame/scenes/:idScene/objects/:idObject
 */

const express = require('express');
const objectsWorkers = require('../../workers/game/objectsHandlers');
const urlCheckers = require('../../checkers/urlCheckers');

const objectsRouter = express.Router();

objectsRouter.route('/')
  .get([ ...urlCheckers.chainScene, objectsWorkers.getHandler ])
  .post([ ...urlCheckers.chainScene, objectsWorkers.postHandler ]);

objectsRouter.route('/:idObject')
  .get([ ...urlCheckers.chainObject, objectsWorkers.getOneHandler ])
  .put([ ...urlCheckers.chainObject, objectsWorkers.putHandler ])
  .delete([ ...urlCheckers.chainObject, objectsWorkers.deleteHandler ]);

module.exports = {
  objectsRouter
};