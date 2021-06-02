// Define as ROTAS

const express = require('express');

//Criando um roteador
const router = express.Router(); 

const tokenService = require('../service/tokenService');

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
