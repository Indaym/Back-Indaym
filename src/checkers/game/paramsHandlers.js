/**
 * Created by nicolas on 02/02/17.
 */

const urlIdChecker = require('../urlIdChecker');

const idGame = (req, res, next) => {
  urlIdChecker(req, res, next, 'idGame', 'game', (params) => {
    return {
      uuid: params.idGame,
      owner: req.user.uuid,
    };
  });
};

const idPublicGame = (req, res, next) => {
  urlIdChecker(req, res, next, 'idPublicGame', 'game', (params) => {
    return {
      uuid: params.idPublicGame,
      or: [
        { owner: req.user.uuid },
        { published: true },
      ],
    };
  });
};

const idAddedGame = (req, res, next) => {
  (async () => {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games');
    urlIdChecker(req, res, next, 'idAddedGame', 'game', (params) => {
      return {
        uuid: params.idAddedGame,
        or: [
          { uuid: userPopulate.games.map((e) => e.uuid) },
          { owner: req.user.uuid },
        ],
      };
    });
  })()
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

module.exports = {
  idGame,
  idPublicGame,
  idAddedGame,
  idScene,
  idScript,
  idObject,
};