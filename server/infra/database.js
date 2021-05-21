// pg-promise = Biblioteca que escolhemos
const pgp = require('pg-promise')();

const db = pgp({
    user: 'brunoliberali',
    password: 'userdesenv',
    host: 'localhost',
    port: '5433',
    database: 'dbdesenv'
});

module.exports = db;