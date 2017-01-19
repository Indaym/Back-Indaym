/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');
const uuid = require('node-uuid');
const defaultObject = require('./DefaultObject');

module.exports = waterline.Collection.extend({
  identity: 'library_object',
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
    object: {
      type: 'json',
      defaultsTo: defaultObject
    },
    published: {
      type: 'boolean',
      defaultsTo: false
    },
    owner: {
      model: 'user'
    }
  }
});