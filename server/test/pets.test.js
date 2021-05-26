// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const petService = require('../service/petService');
const randomValuesTemplate = require('./randomValuesTemplate');
var dateFormat = require('dateformat');

const { exception } = require('console');

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

test('Should get pets', async function () {

    const pet1 = await petService.savePet({ id: 1,
        tipo_animal: 1,
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1),
        raca: generateChar(20)
    });

    const pet2 = await petService.savePet({ id: 2,
        tipo_animal: 2,
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1),
        raca: generateChar(20)
    });

    const pet3 = await petService.savePet({ id: 3,
        tipo_animal: 1,
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1),
        raca: generateChar(20)
    });

    const response = await request ('http://localhost:3000/pets', 'get');

    expect(response.status).toBe(200);

    const pets = response.data;
    
    expect(pets).toHaveLength(3);

    await petService.deletePet(pet1.id);
    await petService.deletePet(pet2.id);
    await petService.deletePet(pet3.id);

});

test('Should not update a pet', async function () {
    
    const pet = {
        id: 1
    };
    // Comando para alterar no banco
    const response = await request(`http://localhost:3000/pets/${pet.id}`, 'put', pet);

    expect(response.status).toBe(404);

});



