// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const petOwnerService = require('./server/service/petOwnerService');
const ownerService = require('./server/service/ownerService');
const petService = require('./server/service/petService');
const randomValuesTemplate = require('./server/test/randomValuesTemplate');

const generateNumber = function (tipo) {
    return randomValuesTemplate.generateNumber(tipo.toUpperCase());
}

const generateChar = function (limite) {
    return randomValuesTemplate.generateChar(limite)
}

function randomDate(start, end) {
    return randomValuesTemplate.randomDate(start, end);
}

const request = function (url, method, data) {
    return axios ({ url, method, data, validateStatus: false });
}

// Cria um Dono
const owner = ownerService.saveOwner({id: 1,
    cpf: generateNumber('CPF'),
    nome: generateChar(20),
    data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
    sexo: generateChar(1)});

// Cria um Pet
const pet = petService.savePet({ id: 1,
    tipo_animal: 1,
    nome: generateChar(20),
    data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
    sexo: generateChar(1),
    raca: generateChar(20)
});
// Cria o dono do pet
const petOwner =  petOwnerService.savePetOwner({ 
    owner_id: owner.id,
    pet_id: pet.id
});
console.log('2 Deletando petOwner id -> '+ petOwner.id);
// Deleta o dono do pet
const response = request(`http://localhost:3000/v1/petowners/${petOwner.id}`, 'delete');

expect(response.status).toBe(204);

const petOwners = petOwnerService.getPetOwners();
expect(petOwners).toHaveLength(0);

