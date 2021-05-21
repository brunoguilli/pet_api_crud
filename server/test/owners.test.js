// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const ownerService = require('../service/ownerService');

// Crypto -> Gera dados randomicos
const crypto = require('crypto');
const { exception } = require('console');

const generateNumber = function (limite) {
    return Math.random().toString(limite);
}

const generateChar = function (limite) {
    return crypto.randomBytes(limite).toString('hex');
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

test('Sould get owners', async function () {
  
    // given - dado que
    const owner1 = ownerService.saveOwner({cpf: generateNumber(11),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});

    const owner2 = ownerService.saveOwner({cpf: generateNumber(11),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});
        
    const owner3 = ownerService.saveOwner({cpf: generateNumber(11),
        nome: generateChar(20),
        data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
        sexo: generateChar(1)});
    
    // when - quando acontecer
    const response = await axios ({
        url: 'http://localhost:3000/owners',
        method: 'get'
    });
    const owners = response.data;
    // then - então
    expect(owners).toHaveLength(6);
});