// Camada responsável pela comunicação com o banco de dados
const database = require('../infra/database');

exports.getUserByLogin = function (login) {
    return database.oneOrNone('select * from user_pet_api where username = $1 and user_password = $2 and permission = $3 ', [login.username, login.user_password, 'S' ]);
};

