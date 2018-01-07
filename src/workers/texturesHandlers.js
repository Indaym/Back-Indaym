/**
 * Created by nicolas on 16/09/17.
 */

const waterline = require('waterline');
const paramHandler = require('../middleware/paramHandler');
const errorHandler = require('../middleware/errorHandler');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
}).single('file');

/**
 * Get a group of textures (public or not)
 */
const getHandler = (req, res, next) => {
  req.app.models.textures.find({
    select: ['uuid', 'name', 'published'],
    or: [
      { owner: req.user.uuid },
      { published: true }
    ]
  })
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((error) => {
    console.log(error);
    errorHandler.errorExecutor(next);
  });
};

/**
 * Get only one texture
 */
const getOneHandler = (req, res, next) => {
  req.app.models.textures.findOne({
    uuid: req.params.idPublicTexture,
    or: [
      { owner: req.user.uuid },
      { published: true }
    ]
  })
  .then((results) => {
    if (results === undefined)
      errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Texture not found"));
    else
      res.status(200).send(results);
  })
  .catch((error) => {
    console.log(error);
    errorHandler.errorExecutor(next);
  });
};

/**
 * File Download Handler
 */
const postFileDownload = (req, res, next) => {
  upload(req, res, function(err){
    if(err){
      res.status(500).send(err);
      return;
    }
    next();
  });
}

/**
 * Add a texture
 */
const postHandler = (req, res, next) => {
    let createTexture = {
      name: req.file.originalname,
      image: req.file.buffer,
      format: req.file.mimetype,
      owner: req.user.uuid
    };
    req.app.models.textures.create(createTexture)
    .then((resu) => {
      res.status(201).json({uuid : resu.uuid});
    })
    .catch((error) => {
      console.log(error);
      errorHandler.errorExecutor(next);
    });
};

/**
 * Update an existing texture
 */
const putHandler = async (req, res, next) => {
  try {
    let updateObj = paramHandler.paramExtract(req.body, ['published', 'name']);
    const textures = await req.app.models.textures.update({
      uuid: req.params.idTexture,
      owner: req.user.uuid,
    }, updateObj);

    if (textures.length == 0)
      errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't update this game"));
    else
      res.status(200).json({ status: 'ok' });
  }
  catch (err) {
    console.log(err.message);
    errorHandler.errorExecutor(next);
  }
};

/**
 * Delete a Texture
 */
const deleteHandler = (req, res, next) => {
  req.app.models.textures.destroy({
    uuid: req.params.idTexture,
    owner: req.user.uuid
  })
  .then((resu) => {
    if (resu.length == 0)
      errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this texture"));
    else
      res.status(200).json({ status: 'ok' });
  })
  .catch((error) => {
    console.log(error);      
    errorHandler.errorExecutor(next);
  });
};

module.exports = {
  getHandler,
  getOneHandler,
  postHandler,
  postFileDownload,
  putHandler,
  deleteHandler
};