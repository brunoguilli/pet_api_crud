// Define as ROTAS

const express = require('express');

//Criando um roteador
const router = express.Router(); 

const petOwnerService = require('../service/petOwnerService');

router.get('/petowners', async function (req, res, next ) {
    try{
        const owners = await petOwnerService.getPetOwners();
        res.json(owners);
    } catch (e) {
        next(e);
    }
}); 

router.post('/petowners', async function (req, res, next ) {
    // req.body -> corpo da requisição
    const petOwner = req.body;
    try {
        const newPetOwner = await petOwnerService.savePetOwner(petOwner);
        res.status(201).json(newPetOwner);
    } catch (e) {
        next(e);
    }
    
} );

router.put('/petowners/:id', async function (req, res, next ) {
    const petOwner = req.body;
    try {
        await petOwnerService.updatePetOwner(req.params.id, petOwner);
        res.status(204).end();
    } catch (e) {
        next(e);
    }

} );

router.delete('/petowners/:id', async function (req, res, next ) {
    try{
        await petOwnerService.deletePetOwner(req.params.id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
    
} );

// Retorna a rota a partir do modulo 
// Pode distribuir as rotas em arquivos diferentes
module.exports = router;

