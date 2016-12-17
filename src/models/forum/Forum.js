const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'forum',
  connection: 'postgresdb',

  attributes: {
    title: 'string',
    description: 'string',

    subForums: {
      collection: 'topics',
      via: 'forum'
    },
  },
});
