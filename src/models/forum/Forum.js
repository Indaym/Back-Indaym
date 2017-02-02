const waterline = require('waterline');
const uuid = require('node-uuid');

module.exports = waterline.Collection.extend({
  identity: 'forum',
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
    title: 'string',
    description: 'string',
    topics: {
      collection: 'topic',
      via: 'forum'
    }
  }
});
