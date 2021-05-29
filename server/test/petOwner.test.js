// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const petOwnerService = require('../service/petOwnerService');
const ownerService = require('../service/ownerService');
const petService = require('../service/petService');
const randomValuesTemplate = require('./randomValuesTemplate');

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

test('Should save a pet owner', async function () {

    // Cria um Dono
    const owner = await ownerService.saveOwner({id: 1,
        cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});

    // Cria um Pet
    const pet = await petService.savePet({ id: 1,
        tipo_animal: 1,
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1),
        raca: generateChar(20)
    });

    const data = {id: 1,
        owner_id: owner.id,
        pet_id: pet.id };
    
    const response = await request('http://localhost:3000/petowners', 'post', data);

    expect(response.status).toBe(201);

    const petOwner = response.data;

    expect(petOwner.owner_id).toBe(data.owner_id);
    expect(petOwner.pet_id).toBe(data.pet_id);

    await petOwnerService.deletePetOwner(petOwner.id);
    await petService.deletePet(pet.id);
    await ownerService.deleteOwner(owner.cpf);
    
});