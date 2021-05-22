// Axios - Biblioteca cliente de requisições/respostas HTTP
const axios = require('axios');
const ownerService = require('../service/ownerService');
const Str = require('@supercharge/strings');

// Crypto -> Gera dados randomicos
const { exception } = require('console');

const generateNumber = function (tipo) {
    if(tipo.toUpperCase() === 'CPF'){
        limite = 13;
    } else {
        limite = 0;
    }
    return Math.random().toString().slice(2,limite);
}

const generateChar = function (limite) {
    return Str.random(limite).toUpperCase();
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

test('Sould get owners', async function () {
  
    // given - dado que
    // const owner1 = ownerService.saveOwner({cpf: generateNumber('CPF'),
    //     nome: generateChar(20),
    //     data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
    //     sexo: generateChar(1)});

    // const owner2 = ownerService.saveOwner({cpf: generateNumber('CPF'),
    //     nome: generateChar(20),
    //     data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
    //     sexo: generateChar(1)});
        
    // const owner3 = ownerService.saveOwner({cpf: generateNumber('CPF'),
    //     nome: generateChar(20),
    //     data_nascimento: randomDate(new Date(1990, 0, 1), new Date()),
    //     sexo: generateChar(1)});
    
    // when - quando acontecer
    const response = await axios ({
        url: 'http://localhost:3000/owners',
        method: 'get'
    });
    const owners = response.data;
    // then - então
    expect(owners).toHaveLength(7);
});