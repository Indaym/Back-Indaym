/**
 * Created by nicolas on 23/01/17.
 */

/*
 * /games/:idGame/scenes/:idScene/objects/
 * /games/:idGame/scenes/:idScene/objects/:idObject
 */

const objectsWorkers = require('../../workers/game/objectsHandlers');
const urlCheckers = require('../../checkers/urlCheckers');

module.exports = (router, baseUrl) => {
  router.route(baseUrl + '/')
    .get([ ...urlCheckers.chainScene, objectsWorkers.getHandler ])
    .post([ ...urlCheckers.chainScene, objectsWorkers.postHandler ]);

  router.route(baseUrl + '/:idObject')
    .get([ ...urlCheckers.chainObject, objectsWorkers.getOneHandler ])
    .put([ ...urlCheckers.chainObject, objectsWorkers.putHandler ])
    .delete([ ...urlCheckers.chainObject, objectsWorkers.deleteHandler ]);
};
