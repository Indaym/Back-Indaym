/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');
const uuid = require('node-uuid');

module.exports = waterline.Collection.extend({
  identity: 'game',
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
    description: {
      type: 'text',
      defaultsTo: ''
    },
    published: {
      type: 'boolean',
      defaultsTo: false
    },
    price: {
      type: 'integer',
      defaultsTo: 0
    },
    tags: {
      type: 'array',
      defaultsTo: [],
      containOnlyString: true
    },
    comments: {
      type: 'string',
      defaultsTo: '',
    },
    rate: {
      type: 'integer',
      defaultsTo: 0
    },
    owner: {
      model: 'user'
    },
    scenesRef: {
      collection: 'scene',
      via: 'gameRef'
    }
  },

  types: {
    containOnlyString: (arr) => {
      return arr.every((elem) => {
        return typeof elem === 'string';
      })
    }
  }
});