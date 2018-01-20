/**
 * Created by nicolas on 16/09/17.
 */

const urlIdChecker = require('../urlIdChecker');

const idTexture = (req, res, next) => {
  urlIdChecker(req, res, next, 'idTexture', 'textures', (params) => {
    return {
      uuid: req.params.idTexture,
      or: [
        { owner: req.user.uuid },
      ]
    };
  });
};

const idPublicTexture = (req, res, next) => {
  urlIdChecker(req, res, next, 'idPublicTexture', 'textures', (params) => {
    return {
      uuid: req.params.idPublicTexture,
    };
  });
};

module.exports = {
  idTexture,
  idPublicTexture
};