// Camada responsável pelas regras de negócio

const ownerData = require('../data/ownerData');

exports.getOwners = function () {
    return ownerData.getOwners();
}

exports.saveOwner = function (owner) {
    return ownerData.saveOwner(owner)
}