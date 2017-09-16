/**
 * Created by nicolas on 16/09/17.
 */

const urlIdChecker = require('../urlIdChecker');

const idTexture = (req, res, next) => {
  urlIdChecker(req, res, next, 'idTexture', 'textures', (params) => {
    return {
      uuid: req.params.idTexture,
      or: [
        { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
      ]
    };
  });
};

module.exports = {
  idTexture
};