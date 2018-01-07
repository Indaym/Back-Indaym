/**
 * Created by nicolas on 16/09/17.
 */

/**
 * /textures/
 * /textures/:idTexture
 */

const express = require('express');
const textureWorkers = require('../workers/texturesHandlers');
const paramsHandlers = require('../checkers/textures/paramsHandlers');
const textureCheckers = require('../checkers/textures/textureCheckers');
const config = require('../../config/config');
const passport = require('passport');

const texturesRouter = express.Router(config.routerConfig);

texturesRouter.param('idTexture', paramsHandlers.idTexture);
texturesRouter.param('idPublicTexture', paramsHandlers.idPublicTexture);

texturesRouter.route('/')
  .get(textureWorkers.getHandler)
  .post(
    [
      textureCheckers.postChecker,
      textureWorkers.postFileDownload,
      textureCheckers.uniqueChecker,
      textureWorkers.postHandler
    ],
  ).options((req, res, next) => {
    res.status(200).json({ status: 'ok' });
  });

texturesRouter.route('/:idTexture')
  .put(textureWorkers.putHandler)
  .delete(textureWorkers.deleteHandler);

texturesRouter.route('/:idPublicTexture')
  .get(textureWorkers.getOneHandler);

module.exports = {
  texturesRouter
};