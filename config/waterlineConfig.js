/**
 * Created by djavrell on 05/12/16.
 */

const PGAdapter = require('waterline-postgresql');

module.exports.DBconfig = {
  adapters: {
    'postgres': PGAdapter,
  },

  connections: {
    postgresdb: {
      adapter: 'postgres',
      connection: {
        database: 'bu0fa0pob3vh0dh',
        host: 'bu0fa0pob3vh0dh-postgresql.services.clever-cloud.com',
        user: 'uxtwneunnaefxjbbwycb',
        password: '6HOkNrIpN5SweGglH2cw',
        port: 5432,
        ssl: false,
      },
      pool: {
        min: 2,
        max: 20,
      },
    },
  },
};

/**
      connection: {
        database: 'bnc4cnogpb2rxwd',
        host: 'bnc4cnogpb2rxwd-postgresql.services.clever-cloud.com',
        user: 'uy0rfk0tyaulc9garili',
        password: 'IdTezRfmU1Onx6NhynUf',
        port: 5432,
        ssl: false,
      },

 */