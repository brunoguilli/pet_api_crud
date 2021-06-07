// Define as ROTAS

const express = require('express');

//Criando um roteador
const router = express.Router(); 

const petOwnerService = require('../../service/petOwnerService');

/**
 * @swagger
 * /v1/petowners:
 *   get:
 *     tags:
 *     - ""
 *     summary: "Retorna uma lista dos Owners e seus Pets"
 *     description: "Retorna uma lista contendo todos os Owners e seus Pets."
 *     responses:
 *      '200':
 *        description: Uma lista de Owners e seus Pets
 *        schema:
 *          type: array
 *          items:
 *            properties:
 *              id:
 *                type: "number"
 *              owner_id:
 *                type: "number"
 *              pet_id:
 *                type: "number"
 */
router.get('/v1/petowners', async function (req, res, next ) {
    try{
        const owners = await petOwnerService.getPetOwners();
        res.json(owners);
    } catch (e) {
        next(e);
    }
}); 

/**
 * @swagger
 * /v1/petowners:
 *   post:
 *     tags:
 *     - ""
 *     summary: "Cria o vínculo entre o owner e o seu pet"
 *     description: "Faz com que seja criado o registro de um owner e seu pet."
 *     operationId: "createPetOwner"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created a Pet Owner object"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/PetOwner"
 *     responses:
 *       default:
 *         description: "successful operation"
 * definitions:
 *     PetOwner:
 *       type: "object"
 *       properties:
 *          id:
 *            type: "number"
 *          owner_id:
 *            type: "number"
 *          pet_id:
 *            type: "number"
 */
router.post('/v1/petowners', async function (req, res, next ) {
    // req.body -> corpo da requisição
    const petOwner = req.body;
    try {
        const newPetOwner = await petOwnerService.savePetOwner(petOwner);
        res.status(201).json(newPetOwner);
    } catch (e) {
        next(e);
    }
    
} );

/**
 * @swagger
 * /v1/petowners/{id}:
 *   delete:
 *     tags:
 *     - ""
 *     summary: "Deleta um Owner e seu Pet"
 *     description: "Deleta um Owner e seu Pet pelo ID."
 *     operationId: "deletePetOwner"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Pet Owner ID"
 *       required: true
 *       type: "string"
 *     responses:
 *       401:
 *         description: "Pet Owner not found"
 * definitions:
 *     PetOwner:
 *       type: "object"
 *       properties:
 *          id:
 *            type: "number"
 *          owner_id:
 *            type: "number"
 *          pet_id:
 *            type: "number" 
 */
router.delete('/v1/petowners/:id', async function (req, res, next ) {
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

