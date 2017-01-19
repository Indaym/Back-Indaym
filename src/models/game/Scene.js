/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'scene',
  connection: 'postgresdb',

  attributes: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      required: true
    },
    gameRef: {
      model: 'game'
    }
  }
});