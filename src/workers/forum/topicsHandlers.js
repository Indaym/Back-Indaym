/**
 * Created by nicolas on 29/01/17.
 */

const waterline = require ("waterline");
const paramHandler = require('../../middleware/paramHandler');
const errorHandler = require('../../middleware/errorHandler');

/**
 * Get a group of topics
 */
const getHandler = (req, res, next) => {
  req.app.models.topic.find({
    forum: req.params.idForum
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Get only one topic
 */
const getOneHandler = (req, res, next) => {
  req.app.models.topic.findOne({
    forum: req.params.idForum,
    uuid: req.params.idTopic
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Topic not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Create a topic
 */
const postHandler = (req, res, next) => {
  let createObj = paramHandler.paramExtract(req.body, ['title', 'subject']);
  createObj.forum = req.params.idForum;
  createObj.owner = '4d24a2d2-0ab5-4348-a779-672eb557a6be';
  req.app.models.topic.create(createObj)
    .then((results) => {
      res.status(201).json({uuid : results.uuid});
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an existing topic
 */
const putHandler = (req, res, next) => {
  let updateObj = paramHandler.paramExtract(req.body, ['title', 'subject']);
  req.app.models.topic.update({
    forum: req.params.idForum,
    uuid: req.params.idTopic
  },updateObj)
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this topic"));
      else
        res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Delete an existing topic
 */
const deleteHandler = (req, res, next) => {
  req.app.models.topic.destroy({
    forum: req.params.idForum,
    uuid: req.params.idTopic
  })
    .then((results) => {
      if (results.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this topic"));
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
  deleteHandler,
};
