/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/:idScene/objects/
 * /games/:idGame/scenes/:idScene/objects/:idObject
 */

const express = require('express');
const objectsWorkers = require('../../workers/game/objectsHandlers');
const idChecker = require('../../checkers/idChecker');

const objectsRouter = express.Router();

objectsRouter.route('/')
  .get(objectsWorkers.getHandler)
  .post(objectsWorkers.postHandler);

objectsRouter.route('/:idObject')
  .all(idChecker.setter('idObject', 'view_object'))
  .get([idChecker.executor, objectsWorkers.getOneHandler])
  .put([idChecker.executor, objectsWorkers.putHandler])
  .delete([idChecker.executor, objectsWorkers.deleteHandler]);

module.exports = {
  objectsRouter
};