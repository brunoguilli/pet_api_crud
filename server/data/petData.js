const database = require('../infra/database');

exports.getPets = function () {
    return database.query('select * from pets');
};

exports.getPet = function (id) {
    return database.oneOrNone('select * from pets where id = $1', [id]);
};

exports.getPetById = function (id) {
    return database.oneOrNone('select * from pets where id = $1', [id]);
};

exports.getAnimalById = function (id) {
    return database.oneOrNone('select * from animals where id = $1', [id]);
};

exports.savePet = function (pet) {
    return database.one('insert into pets(tipo_animal, nome, data_nascimento, sexo, raca) values ($1, $2, $3, $4, $5) returning *', 
        [ pet.tipo_animal, pet.nome, pet.data_nascimento, pet.sexo, pet.raca ]);
};

exports.deletePet = function (id) {
    return database.none('delete from pets where id = $1', [id]);
};

exports.updatePet = async function (id, pet) {
    return database.none('update pets set tipo_animal = $1 ,nome = $2 , data_nascimento = $3, sexo = $4, raca = $5 where id = $6',
        [pet.tipo_animal, pet.nome, pet.data_nascimento, pet.sexo, pet.raca, id]);
};