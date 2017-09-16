/**
 * Created by nicolas on 16/09/17.
 */

const idTexture = (req, res, next) => {
  urlIdChecker(req, res, next, 'idTexture', 'textures', (params) => {
    return {
      uuid: params.idTexture
    };
  });
};

module.exports = {
  idTexture
};