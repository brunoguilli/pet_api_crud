// Camada responsável pela comunicação com o banco de dados
const database = require('../infra/database');

exports.getOwners = function () {
    return database.query('select * from pet_owner');
};

exports.getOwner = function (cpf) {
    return database.oneOrNone('select * from pet_owner where cpf = $1', [cpf]);
};

exports.getOwnerByCpf = function (cpf) {
    return database.oneOrNone('select * from pet_owner where cpf = $1', [cpf]);
};

exports.saveOwner = function (owner) {
    // database.one -> Espera algum retorno
    return database.one('insert into pet_owner(cpf, nome, data_nascimento, sexo) values ($1, $2, $3, $4) returning *', 
        [ owner.cpf, owner.nome, owner.data_nascimento, owner.sexo ]);
};

exports.deleteOwner = function (cpf) {
    // none -> Não retorna nada
    return database.none('delete from pet_owner where cpf = $1', [cpf]);
};

exports.updateOwner = async function (cpf, owner) {
    return database.none('update pet_owner set nome = $1, data_nascimento = $2, sexo = $3 where cpf = $4',
        [owner.nome, owner.data_nascimento, owner.sexo, cpf]);
};

