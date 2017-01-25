/**
 * Created by nicolas on 25/01/17.
 */

const urlIdChecker = require('./urlIdChecker');

const libraryIdObject = (req, res, next) => {
  urlIdChecker(req, res, next, 'idObject', 'library_object');
};

const idGame = (req, res, next) => {
  urlIdChecker(req, res, next, 'idGame', 'game');
};

const idScene = (req, res, next) => {
  urlIdChecker(req, res, next, 'idScene', 'scene');
};

const idScript = (req, res, next) => {
  urlIdChecker(req, res, next, 'idScript', 'script');
};

const idObject = (req, res, next) => {
  urlIdChecker(req, res, next, 'idObject', 'view_object');
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