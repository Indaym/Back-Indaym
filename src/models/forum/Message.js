const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'message',
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
    message: 'string',
    up: {
      type: 'integer',
      defaultsTo: 0
    },
    down: {
      type: 'integer',
      defaultsTo: 0
    },
    answerTo: {
      model: 'message'
    },
    topic: {
      model: 'topic',
    },
    owner: {
      model: 'user',
    }
  }
});
