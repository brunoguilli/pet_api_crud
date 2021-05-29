// Camada responsável pela comunicação com o banco de dados
const database = require('../infra/database');

exports.getOwners = function () {
    return database.query('select * from owners');
};

exports.getOwner = function (cpf) {
    return database.oneOrNone('select * from owners where cpf = $1', [cpf]);
};

exports.getOwnerById = function (id) {
    return database.oneOrNone('select * from owners where id = $1', [id]);
};

exports.getOwnerByCpf = function (cpf) {
    return database.oneOrNone('select * from owners where cpf = $1', [cpf]);
};

exports.saveOwner = function (owner) {
    // database.one -> Espera algum retorno
    return database.one('insert into owners(cpf, nome, data_nascimento, sexo) values ($1, $2, $3, $4) returning *', 
        [ owner.cpf, owner.nome, owner.data_nascimento, owner.sexo ]);
};

exports.deleteOwner = function (cpf) {
    // none -> Não retorna nada
    return database.none('delete from owners where cpf = $1', [cpf]);
};

exports.updateOwner = async function (cpf, owner) {
    return database.none('update owners set nome = $1, data_nascimento = $2, sexo = $3 where cpf = $4',
        [owner.nome, owner.data_nascimento, owner.sexo, cpf]);
};

