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

texturesRouter.route('/')
  .get(passport.authenticate('jwt', { session: false }), textureWorkers.getHandler)
  .post(passport.authenticate('jwt', { session: false }), 
    [
      textureCheckers.postChecker,
      textureWorkers.postFileDownload,
      textureCheckers.uniqueChecker,
      textureWorkers.postHandler
    ],
  ).options((req, res, next) => {
    res.status(200).end();
  });

texturesRouter.route('/:idTexture')
  .get(passport.authenticate('jwt', { session: false }), textureWorkers.getOneHandler)
  .delete(passport.authenticate('jwt', { session: false }), textureWorkers.deleteHandler);

module.exports = {
  texturesRouter
};