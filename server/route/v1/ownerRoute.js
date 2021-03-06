// Define as ROTAS

const express = require('express');

//Criando um roteador
const router = express.Router(); 

const ownerService = require('../../service/ownerService');

/**
 * @swagger
 * /v1/owners:
 *   get:
 *     tags:
 *     - ""
 *     summary: "Retorna uma lista de Owners"
 *     description: "Retorna uma lista contendo todos os Owners."
 *     responses:
 *      '200':
 *        description: Uma lista de Owners
 *        schema:
 *          type: array
 *          items:
 *            properties:
 *              id:
 *                type: "number"
 *              cpf:
 *                type: "string"
 *              nome:
 *                type: "string"
 *              data_nascimento:
 *                type: "string"
 *                example: "08-jun-2021"
 *                format: date
 *              sexo:
 *                type: "string"  
 */
router.get('/v1/owners', async function (req, res, next ) {
    try{
        const owners = await ownerService.getOwners();
        res.json(owners);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /v1/owners/{id}:
 *   get:
 *     tags:
 *     - ""
 *     summary: "Retorna um Owner"
 *     description: "Retorna um Owner pelo ID."
 *     operationId: "getOwnerById"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Id do Owner"
 *       required: true
 *       type: "string"
 *     responses:
 *       401:
 *         description: "Owner not found"
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
 router.get('/v1/owners/:id', async function (req, res, next ) {
    try{
        const owners = await ownerService.getOwnerById(req.params.id);
        res.json(owners);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /v1/owners:
 *   post:
 *     tags:
 *     - ""
 *     summary: "Cria um Owner"
 *     description: "Faz com que seja criado o registro do dono de um futuro PET."
 *     operationId: "createOwner"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created a Owner object"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Owner"
 *     responses:
 *       default:
 *         description: "successful operation"
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
router.post('/v1/owners', async function (req, res, next ) {
    // req.body -> corpo da requisi????o
    const owner = req.body;
    try {
        const newOwner = await ownerService.saveOwner(owner);
        res.status(201).json(newOwner);
    } catch (e) {
        next(e);
    }
    
} );

/**
 * @swagger
 * /v1/owners/{cpf}:
 *   put:
 *     tags:
 *     - ""
 *     summary: "Atualiza um Owner"
 *     description: "Atualiza um Owner pelo CPF."
 *     operationId: "updateOwner"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Update a Owner object"
 *       required: true
 *       type: "string"
 *       schema:
 *         $ref: "#/definitions/Owner"
 *     responses:
 *       401:
 *         description: "Owner not found"
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
router.put('/v1/owners/:cpf', async function (req, res, next ) {
    const owner = req.body;
    try {
        await ownerService.updateOwner(req.params.cpf, owner);
        res.status(204).end();
    } catch (e) {
        next(e);
    }

} );


/**
 * @swagger
 * /v1/owners/{cpf}:
 *   delete:
 *     tags:
 *     - ""
 *     summary: "Deleta um Owner"
 *     description: "Deleta um Owner pelo CPF."
 *     operationId: "deleteOwner"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "cpf"
 *       in: "path"
 *       description: "CPF do Owner"
 *       required: true
 *       type: "string"
 *     responses:
 *       401:
 *         description: "Owner not found"
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
router.delete('/v1/owners/:cpf', async function (req, res, next ) {
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

