/**
 * Created by nicolas on 23/01/17.
 */

const waterline = require('waterline');
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');

/**
 * Get a group of games
 */
const getHandler = (req, res, next) => {
  let requestObj = {
    or: [
      { published: true },
      { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
    ]
  };
  if (req.query.search !== undefined)
    requestObj['name'] = { contains: req.query.search };
  requestObj['limit'] = (req.query.interval === undefined) ? 10 : req.query.interval;
  requestObj['skip'] = (req.query.page === undefined) ? 0 : requestObj['limit'] * req.query.page;
  req.app.models.game.find(requestObj)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Get only one game
 */
const getOneHandler = (req, res, next) => {
  req.app.models.game.findOne({
    uuid: req.params.idGame,
    or: [
      //{ owner: '627ef9c7-9cec-4e4e-8b0c-74e770595f88' },
      { published: true },
      { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
    ]
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Game not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Create a game
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['published', 'name', 'tags', 'price', 'description']);
  createObj.owner = '4d24a2d2-0ab5-4348-a779-672eb557a6be';
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
    uuid: req.params.idGame,
    owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
  }, updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this game"));
      else
        res.status(200).end();
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
    uuid: req.params.idGame,
    owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this game"));
      else
        res.status(200).end();
    })
    .catch((err) => {
      errorHandler.errorExecutor(next);
    });
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler
};