/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');
const uuid = require('node-uuid');

module.exports = waterline.Collection.extend({
  identity: 'scene',
  connection: 'postgresdb',
  autoPk: false,

  attributes: {
    uuid: {
      type: 'string',
      primaryKey: true,
      defaultsTo: () => uuid.v4(),
      unique: true,
      index: true,
      uuidv4: true,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      required: true
    },
    gameRef: {
      model: 'game'
    },
    objects: {
      collection: 'view_object',
      via: 'sceneRef'
    },
    scripts: {
      collection: 'script',
      via: 'sceneRef'
    },
  }
});