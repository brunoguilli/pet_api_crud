// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const petService = require('../service/petService');
const randomValuesTemplate = require('./randomValuesTemplate');
var dateFormat = require('dateformat');

const { exception } = require('console');

const generateChar = function (limite) {
    return randomValuesTemplate.generateChar(limite)
}

function randomDate(start, end) {
    return randomValuesTemplate.randomDate(start, end);
}

const request = function (url, method, data) {
    return axios ({ url, method, data, validateStatus: false });
}


test('Should save a pet', async function () {

    const data = {id: 1,
        tipo_animal: 1,
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1),
        raca: generateChar(20)};

    const response = await request('http://localhost:3000/pets', 'post', data);

    expect(response.status).toBe(201);

    const pet = response.data;

    expect(pet.tipo_animal).toBe(data.tipo_animal);
    expect(pet.nome).toBe(data.nome);
    expect(dateFormat(pet.data_nascimento, "yyyy-mm-dd")).toBe(data.data_nascimento);
    expect(pet.sexo).toBe(data.sexo);
    expect(pet.raca).toBe(data.raca);

    await petService.deletePet(pet.id);

});

// test.only('Should not save a pet', async function () {

//     const data = {id: 1,
//         tipo_animal: 1,
//         nome: generateChar(20),
//         data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
//         sexo: generateChar(1),
//         raca: generateChar(20)};

//     const response1 = await request('http://localhost:3000/pets', 'post', data);
//     const response2 = await request('http://localhost:3000/pets', 'post', data);

//     expect(response2.status).toBe(409);

//     const pet = response1.data;

//     await ownerService.deleteOwner(pet.id);

// });

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

    const response = await request(`http://localhost:3000/pets/${pet.id}`, 'put', pet);

    expect(response.status).toBe(404);

});

test('Should delete a pet', async function () {

    const pet = await petService.savePet({id: 1,
        tipo_animal: 1,
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1),
        raca: generateChar(20)});
    
    const response = await request(`http://localhost:3000/pets/${pet.id}`, 'delete');
    
    expect(response.status).toBe(204);

    const pets = await petService.getPets();
    expect(pets).toHaveLength(0);

});

