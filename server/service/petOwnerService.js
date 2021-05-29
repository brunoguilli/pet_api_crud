// Camada responsável pelas regras de negócio
const petOwnerData = require('../data/petOwnerData');
const petData = require('../data/petData');
const ownerData = require('../data/ownerData');

exports.getPetOwners = function () {
    return petOwnerData.getPetOwners();
}

exports.getPetOwner = async function (id) {
    const petOwner = await petOwnerData.getPetOwner(id);
    if (!petOwner) throw new Error('Pet Owner not found');
    return petOwner;
}

exports.savePetOwner = async function (petOwner) {
    const existingPetForOwner = await petOwnerData.getPetAndOwnerById(petOwner);
    if (existingPetForOwner) throw new Error('This Pet already exists for this owner');

    const existingPet = await petData.getPetById(petOwner.pet_id);
    if (!existingPet) throw new Error('This Pet does not exist');

    const existingOwner = await ownerData.getOwnerById(petOwner.owner_id);
    if (!existingOwner) throw new Error('This Owner does not exist');

    return petOwnerData.savePetOwner(petOwner);
}

exports.deletePetOwner = function (id) {
    return petOwnerData.deletePetOwner(id);
}