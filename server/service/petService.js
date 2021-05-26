
const petData = require('../data/petData');

exports.getPets = function () {
    return petData.getPets();
}

exports.getPet = async function (id) {
    const pet = await petData.getPet(id);
    if (!pet) throw new Error('Pet not found');
    return pet;
}

exports.savePet = async function (pet) {
    const existingPet = await petData.getPetById(pet.id);
    if (existingPet) throw new Error('Pet already exists');
    return petData.savePet(pet);
}

exports.deletePet = function (id) {
    return petData.deletePet(id);
}

exports.updatePet = async function (id, pet) {
    await exports.getPet(id);
    return petData.updatePet(id, pet);
}
