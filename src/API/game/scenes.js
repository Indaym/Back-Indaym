/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/
 * /games/:idGame/scenes/:idScene
 */

const scenesWorkers = require('../../workers/game/scenesHandlers');
const urlCheckers = require('../../checkers/urlCheckers');
const sceneCheckers = require('../../checkers/game/sceneCheckers');
const objects = require('./objects');
const scripts = require('./scripts');

module.exports = (router, baseUrl) => {
  router.route(baseUrl + '/')
    .get([
      urlCheckers.idGame,
      scenesWorkers.getHandler
    ])
    .post([
      urlCheckers.idGame,
      sceneCheckers.postChecker,
      scenesWorkers.postHandler
    ]);

  router.route(baseUrl + '/:idScene')
    .get([
      ...urlCheckers.chainScene,
      scenesWorkers.getOneHandler
    ])
    .put([
      ...urlCheckers.chainScene,
      scenesWorkers.putHandler
    ])
    .delete([
      ...urlCheckers.chainScene,
      scenesWorkers.deleteHandler
    ]);

  objects(router, baseUrl + '/:idScene/objects');
  scripts(router, baseUrl + '/:idScene/scripts');
};
