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
  .get([objectsCheckers.urlIdObject, objectsWorkers.getOneHandler])
  .put([objectsCheckers.urlIdObject, objectsWorkers.putHandler])
  .delete([objectsCheckers.urlIdObject, objectsWorkers.deleteHandler]);

module.exports = {
  objectsRouter
};