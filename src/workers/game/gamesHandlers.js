/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');
const createRes = require('../../helpers').createRes;

/**
 * Get a group of games
 */
const getHandler = async (req, res, next) => {
  try {
    const games = await req.app.models.game.find(req.filterQuery);
    return createRes(res, 200, games);
  } catch (err) {
    errorHandler.errorExecutor(next);
  }
};

/**
 * Get playable games
 */
const playHandler = async (req, res, next) => {
  try {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games')
    const games = await req.app.models.game.find({
      ...req.filterQuery,
      or: [
        {owner: req.user.uuid},
        {uuid: userPopulate.games.map((e) => e.uuid)}
      ]
    });
    return createRes(res, 200, games);
  } catch (err) {
    console.log(err);
    errorHandler.errorExecutor(next);
  }
};

/**
 * Get count playable games
 */
const playCounter = async (req, res, next) => {
  try {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games')
    const nbGames = await req.app.models.game.count({
      ...req.filterQuery,
      or: [
        {owner: req.user.uuid},
        {uuid: userPopulate.games.map((e) => e.uuid)}
      ]
    });
    return createRes(res, 200, { nbGames });
  } catch (err) {
    console.log(err);
    errorHandler.errorExecutor(next);
  }
}

/**
 * Get only one game
 */
const getOneHandler = async (req, res, next) => {
  try {
    const userPopulate = await req.app.models.user.findOne({uuid: req.user.uuid}).populate('games');
    const game = await req.app.models.game.findOne({
      uuid: req.params.idAddedGame,
      or: [
        { uuid: userPopulate.games.map((e) => e.uuid) },
        { owner: req.user.uuid },
      ]
    })
    if (game === undefined)
      errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Game not found"));
    else
      res.status(200).send(game);
  } catch (err) {
    console.log(err);
    errorHandler.errorExecutor(next);
  };
};

/**
 * Create a game
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['published', 'name', 'tags', 'price', 'description']);
  createObj.owner = req.user.uuid;
  req.app.models.game.create(createObj)
    .then((results) => {
      res.status(201).json({uuid : results.uuid});
    })
    .catch((err) => {
      console.log(err.message);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an existing game
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['published', 'name', 'tags', 'price', 'comments', 'rate', 'description']);
  req.app.models.game.update({
    uuid: req.params.idAddedGame,
    owner: req.user.uuid,
  }, updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this game"));
      else
        res.status(200).json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err.message);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Delete an existing game
 */
const deleteHandler = (req, res, next) => {
  req.app.models.game.destroy({
    uuid: req.params.idAddedGame,
    owner: req.user.uuid
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this game"));
      else
        res.status(200).json({ status: 'ok' });
    })
    .catch((err) => {
      errorHandler.errorExecutor(next);
    });
};

const count = async (req, res, next) => {
  try {
    const nbGames = await req.app.models.game.count(req.filterQuery);
    return createRes(res, 200, { nbGames })
  } catch (e) {
    console.log(e);
    return createRes(res, 500);
  }
}

module.exports = {
  getHandler,
  playHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler, 
  count,
  playCounter,
};