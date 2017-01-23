/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/:idScene/objects/
 * /games/:idGame/scenes/:idScene/objects/:idObject
 */

const express = require('express');
const objectsWorkers = require('../../workers/game/objectsHandlers');
const objectsCheckers = require('../../checkers/game/objectsCheckers');

const objectsRouter = express.Router();


objectsRouter.route('/')
  .get(objectsWorkers.getHandler)
  .post(objectsWorkers.postHandler);

objectsRouter.route('/:idObject')
  .all(objectsCheckers.urlIdObject)
  .get(objectsWorkers.getOneHandler)
  .put(objectsWorkers.putHandler)
  .delete(objectsWorkers.deleteHandler);

module.exports = {
  objectsRouter
};