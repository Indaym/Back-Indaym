const waterline = require('waterline');

const TopicsCollection = waterline.Collection.extend({
  identity: 'Topics',
  connection: 'postgresdb',
  attribut: {
    title: 'string',
    subject: 'string',
    messages: {
      collection: 'Messages',
      via: 'owner',
    }
  }
});

module.exports = {
  TopicsCollection,
};
