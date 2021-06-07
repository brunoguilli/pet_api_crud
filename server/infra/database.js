require('dotenv/config');
// Configuração do banco de dados
// pg-promise = Biblioteca que escolhemos
const pgp = require('pg-promise')();

const db = pgp({
    user: process.env.USERDB,
    password: process.env.PASSDB,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});

module.exports = db;
