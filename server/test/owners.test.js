// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const ownerService = require('../service/ownerService');
const randomValuesTemplate = require('./randomValuesTemplate');

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

test.only('Should get owners', async function () {

    const owner1 = await ownerService.saveOwner({cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});

    const owner2 = await ownerService.saveOwner({cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});
        
    const owner3 = await ownerService.saveOwner({cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});
    
    const response = await request ('http://localhost:3000/owners', 'get');

    expect(response.status).toBe(200);

    const owners = response.data;
    expect(owners).toHaveLength(3);
    await ownerService.deleteOwner(owner1.cpf);
    await ownerService.deleteOwner(owner2.cpf);
    await ownerService.deleteOwner(owner3.cpf);

});

test('Should save a owner', async function () {

    const data = {cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)};

    const response = await request('http://localhost:3000/owners', 'post', data);

    expect(response.status).toBe(201);

    const owner = response.data;

    expect(owner.cpf).toBe(data.cpf);
    expect(owner.nome).toBe(data.nome);
    expect(dateFormat(owner.data_nascimento, "yyyy-mm-dd")).toBe(data.data_nascimento);
    expect(owner.sexo).toBe(data.sexo);

    await ownerService.deleteOwner(owner.cpf);

});

test('Should not save a owner', async function () {

    const data = {cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)};

    const response1 = await request('http://localhost:3000/owners', 'post', data);
    const response2 = await request('http://localhost:3000/owners', 'post', data);

    expect(response2.status).toBe(409);

    const owner = response1.data;

    await ownerService.deleteOwner(owner.cpf);

});

test('Should not update a owner', async function () {
    
    const owner = {
        cpf: 1
    };
    // Comando para alterar no banco
    const response = await request(`http://localhost:3000/owners/${owner.cpf}`, 'put', owner);

    expect(response.status).toBe(404);

});

test('Should update a owner', async function () {

    // Insere um owner no banco
    const owner = await ownerService.saveOwner({cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});
    
    // modificando os valores do owner criado
    owner.nome = generateChar(20);
    owner.data_nascimento = randomDate(new Date(1990, 0, 1), new Date());
    owner.sexo = generateChar(1);

    // Comando para alterar no banco
    const response = await request(`http://localhost:3000/owners/${owner.cpf}`, 'put', owner);

    expect(response.status).toBe(204);

    // Busca o registro no banco
    const updatedOwner = await ownerService.getOwner(owner.cpf);

    // Compara os valores alterados
    expect(updatedOwner.cpf).toBe(owner.cpf);
    expect(updatedOwner.nome).toBe(owner.nome);
    expect(dateFormat(updatedOwner.data_nascimento, "yyyy-mm-dd")).toBe(owner.data_nascimento);
    expect(updatedOwner.sexo).toBe(owner.sexo);

    // Deleta o registro
    await ownerService.deleteOwner(owner.cpf);

});

test('Should delete a owner', async function () {

    // Insere um owner no banco
    const owner = await ownerService.saveOwner({cpf: generateNumber('CPF'),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});
    
    // Comando para alterar no banco
    const response = await request(`http://localhost:3000/owners/${owner.cpf}`, 'delete');
    
    expect(response.status).toBe(204);

    const owners = await ownerService.getOwners();
    expect(owners).toHaveLength(0);

});