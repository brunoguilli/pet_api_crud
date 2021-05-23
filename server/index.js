const express = require('express');
const app = express();

// Ao realizar uma requisição, mostra o conteúdo do corpo
app.use(express.json());

// Delega o local das requisições por meio do middleware
app.use('/', require('./route/ownerRoute'));

// Error handdler centralizado
app.use(function (error, req, res, next){
    
    if (error.message === 'Owner already exists'){
        return res.status(409).send(e.message);
    } 
    if (error.message === 'Owner not found'){
        return res.status(404).send(e.message);
    } 
    res.status(500).send(e.message);
    
});

app.listen(3000);