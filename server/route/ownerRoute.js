// Define as ROTAS

const express = require('express');

//Criando um roteador
const router = express.Router(); 

const ownerService = require('../service/ownerService');

// Rotas do CRUD
router.get('/owners', async function (req, res, next ) {
    try{
        const owners = await ownerService.getOwners();
        res.json(owners);
    } catch (e) {
        next(e);
    }
}); 

router.post('/owners', async function (req, res, next ) {
    // req.body -> corpo da requisição
    const owner = req.body;
    try {
        const newOwner = await ownerService.saveOwner(owner);
        res.status(201).json(newOwner);
    } catch (e) {
        // next(e) -> Acessa os erros centralizdos no index.js
        next(e);
    }
    
} );

router.put('/owners/:cpf', async function (req, res, next ) {
    const owner = req.body;
    try {
        await ownerService.updateOwner(req.params.cpf, owner);
        res.status(204).end();
    } catch (e) {
        next(e);
    }

} );

router.delete('/owners/:cpf', async function (req, res, next ) {
    try{
        await ownerService.deleteOwner(req.params.cpf);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
    
} );

// Retorna a rota a partir do modulo 
// Pode distribuir as rotas em arquivos diferentes
module.exports = router;

