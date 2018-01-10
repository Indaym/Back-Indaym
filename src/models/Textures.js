/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');
const uuid = require('node-uuid');

module.exports = waterline.Collection.extend({
  identity: 'textures',
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
      unique: true,
      required: true
    },
    published: {
      type: 'boolean',
      defaultsTo: false
    },
    format: {
      type: 'string',
      defaultsTo: 'image/jpeg'
    },
    image: {
      type: 'binary',
      required: true
    },
    owner: {
      model: 'user'
    }
  }
});