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
  /*
  fs.readdir('./imgs/', (err, files) => {
    res.status(200).send(files);
  });
  */

  req.app.models.textures.find({
    select: ['uuid', 'name'],
    or: [
      { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
    ]
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      errorHandler.errorExecutor(next);
    });
};

/**
 * Get only one texture
 */
const getOneHandler = (req, res, next) => {
  req.app.models.textures.findOne({
    uuid: req.params.idTexture,
    or: [
      { owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be' },
    ]
  })
    .then((results) => {
      if (results === undefined)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(404, "Texture not found"));
      else
        res.status(200).send(results);
    })
    .catch((err) => {
      errorHandler.errorExecutor(next);
    });
};

/**
 * Add a texture
 */
const postHandler = (req, res, next) => {
  upload(req,res,function(err){
    if(err){
      res.status(500).send(err);
      return;
    }

    let createTexture = {
      name: req.file.originalname,
      image: req.file.buffer,
      format: req.file.mimetype,
      owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
    };
    req.app.models.textures.create(createTexture)
      .then((resu) => {
        res.status(201).json({uuid : resu.uuid});
      })
      .catch((error) => {
        errorHandler.errorExecutor(next);
      });
  });

};

/**
 * Delete a Texture
 */
const deleteHandler = (req, res, next) => {
  req.app.models.textures.destroy({
    uuid: req.params.idTexture,
    owner: '4d24a2d2-0ab5-4348-a779-672eb557a6be'
  })
    .then((resu) => {
      if (resu.length == 0)
        errorHandler.errorExecutor(next, new errorHandler.errorCustom(403, "Can't delete this texture"));
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
  deleteHandler
};