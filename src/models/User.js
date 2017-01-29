/**
 * Created by djavrell on 17/12/16.
 */

const waterline = require('waterline');
const uuid = require('node-uuid');

module.exports = waterline.Collection.extend({
  identity: 'user',
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

    name: 'string',

    messages: {
      collection: 'message',
      via: 'owner'
    },

    topics: {
      collection: 'topic',
      via: 'owner'
    },
    games: {
      collection: 'game'
    }
  },
});
