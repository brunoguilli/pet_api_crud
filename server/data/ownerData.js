// Camada responsável pela comunicação com o banco de dados
const database = require('../infra/database');

exports.getOwners = function () {
    return database.query('select * from pet_owner');
}

exports.saveOwner = function (owner) {
    // database.one -> Espera algum retorno
    return database.one('insert into pet_owner(cpf, nome, data_nascimento, sexo) values ($1, $2, $3, $4) returning *', 
        [ owner.cpf, owner.nome, owner.data_nascimento, owner.sexo ]);
}