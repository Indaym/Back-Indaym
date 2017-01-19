/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'game',
  connection: 'postgresdb',

  attributes: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      required: true
    },
    published: {
      type: 'boolean',
      defaultsTo: false
    },
    price: 'integer',
    tags: {
      type: 'array',
      defaultsTo: [],
      containOnlyString: true
    },
    owner: {
      model: 'user'
    },
    scenesRef: {
      colllection: 'scene',
      via: 'game'
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