const express = require('express');

const router = express.Router(); 

const petService = require('../service/petService');

router.get('/pets', async function (req, res, next ) {
    try{
        const pets = await petService.getPets();
        res.json(pets);
    } catch (e) {
        next(e);
    }
}); 

router.post('/pets', async function (req, res, next ) {
    
    const pet = req.body;
    try {
        const newPet = await petService.savePet(pet);
        res.status(201).json(newPet);
    } catch (e) {
        next(e);
    }
    
} );

router.put('/pets/:id', async function (req, res, next ) {
    const pet = req.body;
    try {
        await petService.updatePet(req.params.id, pet);
        res.status(204).end();
    } catch (e) {
        next(e);
    }

} );

router.delete('/pets/:id', async function (req, res, next ) {
    try{
        await petService.deletePet(req.params.id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
    
} );

module.exports = router;