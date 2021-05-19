// Define as ROTAS

const express = require('express');

//Criando um roteador
const router = express.Router(); 

// Rotas do CRUD
router.get('/owners', async function (req, res) {

});
router.get('/owners/:id', async function (req, res) {

});
router.post('/owners', async function (req, res) {

});
router.put('/owners/:id', async function (req, res) {

});
router.delete('/owners/:id', async function (req, res) {

});

// Retorna a rota a partir do modulo 
// Pode distribuir as rotas em arquivos diferentes
modules.express = router;

