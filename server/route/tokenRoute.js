const express = require('express');

//Criando um roteador
const router = express.Router(); 

const tokenService = require('../service/tokenService');

/**
 * @swagger
 * /token:
 *   post:
 *     tags:
 *     - ""
 *     summary: "Cria um Token"
 *     description: "Faz com que seja criado um token para um usuário pré cadastrado valido por 5 minutos."
 *     operationId: "createToken"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created token object"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Token"
 *     responses:
 *       default:
 *         description: "successful operation"
 * definitions:
 *     Token:
 *       type: "object"
 *       properties:
 *         username:
 *           type: "string"
 *         user_password:
 *           type: "string"
 */
router.post('/token', async function (req, res, next ) {
    const login = req.body;
    try {
        const newToken = await tokenService.generateToken(login);
        res.status(201).json({auth: true, newToken});
    } catch (e) {
        next(e);
    }

} );

module.exports = router;
