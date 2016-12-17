const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'topics',
  connection: 'postgresdb',

  attributes: {
    title: 'string',
    subject: 'string',

    messages: {
      collection: 'messages',
      via: 'topics',
    },

    forum: {
      model: 'forum',
    },

    user: {
      model: 'user',
    }
  },
});
