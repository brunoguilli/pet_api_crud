const express = require('express');
const app = express();

// Ao realizar uma requisição, mostra o conteúdo do corpo
app.use(express.json());

// Delega o local das requisições por meio do middleware
app.use('/', require('./route/ownerRoute'));
app.use('/', require('./route/petRoute'));

// Error handdler centralizado
app.use(function (error, req, res, next){
    
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