/**
 * Created by nicolas on 25/01/17.
 */

const urlIdChecker = require('./urlIdChecker');

const libraryIdObject = (req, res, next) => {
  urlIdChecker(req, res, next, 'idObject', 'library_object');
};

const idGame = (req, res, next) => {
  urlIdChecker(req, res, next, 'idGame', 'game', (params) => {
    return {
      uuid: params.idGame,
      owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
    };
  });
};

const idScene = (req, res, next) => {
  urlIdChecker(req, res, next, 'idScene', 'scene', (params) => {
    return {
      uuid: params.idScene,
      gameRef: params.idGame
    };
  });
};

const idScript = (req, res, next) => {
  urlIdChecker(req, res, next, 'idScript', 'script', (params) => {
    return {
      uuid: params.idScript,
      sceneRef: params.idScene
    };
  });
};

const idObject = (req, res, next) => {
  urlIdChecker(req, res, next, 'idObject', 'view_object', (params) => {
    return {
      uuid: params.idObject,
      sceneRef: params.idScene
    };
  });
};

const chainScene = [ idGame, idScene ];

const chainScript = [ ...chainScene, idScript ];

const chainObject = [ ...chainScene, idObject ];


module.exports = {
  libraryIdObject,
  idGame,
  idScene,
  idScript,
  idObject,
  chainScene,
  chainScript,
  chainObject
};