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
      /*connection: {
        database: 'bnc4cnogpb2rxwd',
        host: 'bnc4cnogpb2rxwd-postgresql.services.clever-cloud.com',
        user: 'uy0rfk0tyaulc9garili',
        password: 'IdTezRfmU1Onx6NhynUf',
        port: 5432,
        ssl: false,
      },*/
      connection: {
        database: 'main',
        host: 'localhost',
        user: 'indaym',
        password: 'indaym',
        port: '4001',
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