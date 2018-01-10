/**
 * Created by nicolas on 07/01/18.
 */

const waterline = require('waterline');
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');
const createRes = require('../../helpers').createRes;

/**
 * Get public games
 */
const getHandler = async (req, res, next) => {
  try {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games')
    const games = await req.app.models.game.find({
      ...req.filterQuery,
      published: true,
//      Permet de récupérer que les jeux que l'on a pas déjà dans notre library
//      uuid: {'!': usergames.games.map((game) => game.uuid)}
    });

    // Add a field 'added' to know if it is already in our library
    const userGamesId = userPopulate.games.map((game) => game.uuid);
    games.forEach((el) => el['added'] = (userGamesId.includes(el.uuid) || el.owner === req.user.uuid));

    return createRes(res, 200, games);
  } catch (err) {
    errorHandler.errorExecutor(next);
  }
};

/**
 * Get count of public games
 */
const getCounter = async (req, res, next) => {
  try {
    const nbGames = await req.app.models.game.count({
      ...req.filterQuery,
      published: true,
    });
    return createRes(res, 200, { nbGames });
  } catch (err) {
    errorHandler.errorExecutor(next);
  }
};

/**
 * Add game in library
 */
const postHandler = async(req, res, next) => {
  try {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games');
    const game = await req.app.models.game.findOne({uuid: req.params.idPublicGame});

    if (userPopulate.games.find((el) => el.uuid === req.params.idPublicGame) !== undefined || game.owner === req.user.uuid)
      return createRes(res, 302, "Already added to your library");
    userPopulate.games.add(req.params.idPublicGame);
    userPopulate.save((er) => {
      createRes(res, 200);
    });
  } catch (err) {
    errorHandler.errorExecutor(next);
  }
};

/**
 * Remove game from library
 */
const deleteHandler = async (req, res, next) => {
  try {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games');
    
    if (userPopulate.games.find((el) => el.uuid === req.params.idPublicGame) === undefined)
      return createRes(res, 404);
    userPopulate.games.remove(req.params.idPublicGame);
    userPopulate.save((er) => {
      createRes(res, 200);
    });
  } catch (err) {
    errorHandler.errorExecutor(next);
  }
};

module.exports = {
  getHandler,
  postHandler,
  deleteHandler,
  getCounter,
};