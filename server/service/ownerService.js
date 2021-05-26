// Camada responsável pelas regras de negócio

const ownerData = require('../data/ownerData');

exports.getOwners = function () {
    return ownerData.getOwners();
}

exports.getOwner = async function (cpf) {
    const owner = await ownerData.getOwner(cpf);
    if (!owner) throw new Error('Owner not found');
    return owner;
}

exports.saveOwner = async function (owner) {
    const existingOwner = await ownerData.getOwnerByCpf(owner.cpf);
    if (existingOwner) throw new Error('Owner already exists');
    return ownerData.saveOwner(owner);
}

exports.deleteOwner = function (cpf) {
    return ownerData.deleteOwner(cpf);
}

exports.updateOwner = async function (cpf, owner) {
    await exports.getOwner(cpf);
    return ownerData.updateOwner(cpf, owner);
}

