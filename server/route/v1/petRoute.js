const express = require('express');

const router = express.Router(); 

const petService = require('../../service/petService');

/**
 * @swagger
 * /v1/pets:
 *   get:
 *     tags:
 *     - ""
 *     summary: "Retorna uma lista de Pets"
 *     description: "Retorna uma lista contendo todos os Pets."
 *     responses:
 *      '200':
 *        description: Uma lista de Pets
 *        schema:
 *          type: array
 *          items:
 *            properties:
 *              id:
 *                type: "number"
 *              tipo_animal:
 *                type: "number"
 *              nome:
 *                type: "string"
 *              data_nascimento:
 *                type: "string"
 *                example: "08-jun-2021"
 *                format: date
 *              sexo:
 *                type: "string"  
 *              raca:
 *                type: "string"
 */
router.get('/v1/pets', async function (req, res, next ) {
    try{
        const pets = await petService.getPets();
        res.json(pets);
    } catch (e) {
        next(e);
    }
}); 

/**
 * @swagger
 * /v1/pets/{id}:
 *   get:
 *     tags:
 *     - ""
 *     summary: "Retorna um Pet"
 *     description: "Retorna um Pet pelo ID."
 *     operationId: "getPet"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Id do Pet"
 *       required: true
 *       type: "string"
 *     responses:
 *       401:
 *         description: "Pet not found"
 * definitions:
 *     Owner:
 *       type: "object"
 *       properties:
 *         id:
 *           type: "number"
 *         cpf:
 *           type: "string"
 *         nome:
 *           type: "string"
 *         data_nascimento:
 *           type: "string"
 *           example: "08-jun-2021"
 *           format: date
 *         sexo:
 *           type: "string"  
 */
 router.get('/v1/pets/:id', async function (req, res, next ) {
    try{
        const owners = await petService.getPet(req.params.id);
        res.json(owners);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /v1/pet:
 *   post:
 *     tags:
 *     - ""
 *     summary: "Cria um Pet"
 *     description: "Faz com que seja criado o registro de um Pet."
 *     operationId: "createPet"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created a Pet object"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Pet"
 *     responses:
 *       default:
 *         description: "successful operation"
 * definitions:
 *     Pet:
 *       type: "object"
 *       properties:
 *          id:
 *            type: "number"
 *          tipo_animal:
 *            type: "number"
 *          nome:
 *            type: "string"
 *          data_nascimento:
 *            type: "string"
 *            example: "08-jun-2021"
 *            format: date
 *          sexo:
 *            type: "string"  
 *          raca:
 *            type: "string"
 */
router.post('/v1/pets', async function (req, res, next ) {
    
    const pet = req.body;
    try {
        const newPet = await petService.savePet(pet);
        res.status(201).json(newPet);
    } catch (e) {
        next(e);
    }
    
} );

/**
 * @swagger
 * /v1/pet/{id}:
 *   put:
 *     tags:
 *     - ""
 *     summary: "Atualiza um Pet"
 *     description: "Atualiza um Pet pelo ID."
 *     operationId: "updatePet"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Update a Pet object"
 *       required: true
 *       type: "string"
 *       schema:
 *         $ref: "#/definitions/Pet"
 *     responses:
 *       401:
 *         description: "Pet not found"
 * definitions:
 *     Pet:
 *       type: "object"
 *       properties:
 *          id:
 *            type: "number"
 *          tipo_animal:
 *            type: "number"
 *          nome:
 *            type: "string"
 *          data_nascimento:
 *            type: "string"
 *            example: "08-jun-2021"
 *            format: date
 *          sexo:
 *            type: "string"  
 *          raca:
 *            type: "string"  
 */
router.put('/v1/pets/:id', async function (req, res, next ) {
    const pet = req.body;
    try {
        await petService.updatePet(req.params.id, pet);
        res.status(204).end();
    } catch (e) {
        next(e);
    }

} );

/**
 * @swagger
 * /v1/pet/{id}:
 *   delete:
 *     tags:
 *     - ""
 *     summary: "Deleta um Pet"
 *     description: "Deleta um Pet pelo ID."
 *     operationId: "deletePet"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Id do Pet"
 *       required: true
 *       type: "string"
 *     responses:
 *       401:
 *         description: "Pet not found"
 * definitions:
 *     Pet:
 *       type: "object"
 *       properties:
 *          id:
 *            type: "number"
 *          tipo_animal:
 *            type: "number"
 *          nome:
 *            type: "string"
 *          data_nascimento:
 *            type: "string"
 *            example: "08-jun-2021"
 *            format: date
 *          sexo:
 *            type: "string"  
 *          raca:
 *            type: "string" 
 */
router.delete('/v1/pets/:id', async function (req, res, next ) {
    try{
        await petService.deletePet(req.params.id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
    
} );

module.exports = router;