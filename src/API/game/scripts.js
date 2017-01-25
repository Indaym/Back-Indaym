/**
 * Created by nicolas on 23/01/17.
 */

/**
 * /games/:idGame/scenes/:idScene/scripts/
 * /games/:idGame/scenes/:idScene/scripts/:idScript
 */

const scriptsWorkers = require('../../workers/game/scriptsHandlers');
const urlCheckers = require('../../checkers/urlCheckers');

module.exports = (router, baseUrl) => {
  router.route(baseUrl + '/')
    .get([ ...urlCheckers.chainScene, scriptsWorkers.getHandler ])
    .post([ ...urlCheckers.chainScene, scriptsWorkers.postHandler ]);

  router.route(baseUrl + '/:idScript')
    .get([ ...urlCheckers.chainScript, scriptsWorkers.getOneHandler ])
    .put([ ...urlCheckers.chainScript, scriptsWorkers.putHandler ])
    .delete([ ...urlCheckers.chainScript, scriptsWorkers.deleteHandler ]);
};
