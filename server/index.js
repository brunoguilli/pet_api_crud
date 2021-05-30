const express = require('express');
const app = express();
const security = require('./security/jwt');
global.SECRET = 'petApiToken';

// Ao realizar uma requisição, mostra o conteúdo do corpo
app.use(express.json());

// Verifica se o usuário está passando o TOKEN
function tokenVerify(req, res, next) {
    security.tokenVerify(req, res, next);
}

// Delega o local das requisições por meio do middleware
app.use('/', require('./route/tokenRoute'))
app.use('/', tokenVerify, require('./route/ownerRoute'));
app.use('/', tokenVerify, require('./route/petRoute'));
app.use('/', tokenVerify, require('./route/petOwnerRoute'));

// Error handdler centralizado
app.use(function (error, req, res, next){
    
    if (error.message === 'You need generete a token at -> http://localhost:3000/token' ){
        return res.status(401).send(error.message);
    }
    if (error.message === 'Owner already exists' || error.message === 'Pet already exists' ){
        return res.status(409).send(error.message);
    } 
    if (error.message === 'CPF must contain only numbers' || error.message === 'CPF must contain 11 characters' ){
        return res.status(409).send(error.message);
    } 
    if (error.message === 'Owner not found' || error.message === 'Pet not found' || error.message === 'Type of Animal not found'){
        return res.status(404).send(error.message);
    } 
    res.status(500).send(error.message);
    
});

app.listen(3000);