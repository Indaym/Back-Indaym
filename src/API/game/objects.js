/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/:idScene/objects/
 * /games/:idGame/scenes/:idScene/objects/:idObject
 */

const objectsWorkers = require('../../workers/game/objectsHandlers');
const urlCheckers = require('../../checkers/urlCheckers');
const objectCheckers = require('../../checkers/objectCheckers');

module.exports = (router, baseUrl) => {
  router.route(baseUrl + '/')
    .get([
      ...urlCheckers.chainScene,
      objectsWorkers.getHandler
    ])
    .post([
      ...urlCheckers.chainScene,
      objectCheckers.postChecker,
      objectCheckers.libraryChecker,
      objectsWorkers.postHandler
    ]);

  router.route(baseUrl + '/:idObject')
    .get([
      ...urlCheckers.chainObject,
      objectsWorkers.getOneHandler
    ])
    .put([
      ...urlCheckers.chainObject,
      objectCheckers.libraryChecker,
      objectsWorkers.putHandler
    ])
    .delete([
      ...urlCheckers.chainObject,
      objectsWorkers.deleteHandler
    ]);
};
