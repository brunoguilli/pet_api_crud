// Camada responsável pela comunicação com o banco de dados
const database = require('../infra/database');

exports.getPetOwners = function () {
    return database.query('select * from pet_owner');
};

exports.getPetOwnersName = function () {
    return database.query('select po.id ,po.owner_id, o.nome nome_owner, po.pet_id,p.nome nome_pet from pet_owner po ,pets p,owners o where po.owner_id = o.id and po.pet_id = p.id');
};

exports.getPetOwner = function (id) {
    return database.oneOrNone('select * from pet_owner where id = $1', [id]);
};

exports.getOwnerById = function (id) {
    return database.oneOrNone('select * from pet_owner where owner_id = $1', [id]);
};

exports.getPetById = function (id) {
    return database.oneOrNone('select * from pet_owner where pet_id = $1', [id]);
};

exports.getPetAndOwnerById = function (petOwner) {
    return database.oneOrNone('select * from pet_owner where pet_id = $1 and owner_id = $2', [petOwner.pet_id, petOwner.owner_id]);
}; 

exports.savePetOwner = function (petOwner) {
    return database.one('insert into pet_owner(owner_id, pet_id) values ($1, $2) returning *', 
        [ petOwner.owner_id, petOwner.pet_id ]);
};

exports.deletePetOwner = function (id) {
    return database.none('delete from pet_owner where id = $1', [id]);
};

exports.updatePetOwner = async function (id, petOwner) {
    return database.none('update pet_owner set owner_id = $1, pet_id = $2 where id = $3',
        [petOwner.owner_id, petOwner.pet_id, id]);
};

