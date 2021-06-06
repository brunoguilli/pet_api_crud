
const express = require('express');
const app = express();
const security = require('./security/jwt');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const alert = require('./alert/sendAlert');

require('dotenv/config');

// Ao realizar uma requisição, mostra o conteúdo do corpo
app.use(express.json());

// Documentação swagger
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Pet Registration API",
        description: "API for register a pet and his owner",
        contact: {
          name: "Bruno Guimarães Liberali",
          email: "brunoguimaraesliberali@gmail.com"
        },
        servers: ["http://localhost:3000"]
      }
    },
    apis: ["./server/route/*.js"]
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
// Verifica se o usuário está passando o TOKEN
function tokenVerify(req, res, next) {
    security.tokenVerify(req, res, next);
}

function sendAlert(message){
    alert.sendSms(message);
}

// Delega o local das rotas das requisições por meio do middleware
app.use('/', require('./route/tokenRoute'));
app.use('/', tokenVerify,require('./route/ownerRoute'));
app.use('/', require('./route/petRoute'));
app.use('/', require('./route/petOwnerRoute'));

// Error handdler centralizado
app.use(function (error, req, res, next){
    
    if (error.message === 'You need generete a token at -> http://localhost:3000/token'  ){
        return res.status(401).send(error.message);
    }
    if (error.message === 'User not found'){
        return res.status(404).send(error.message);
    }
    if (error.message === 'You need generete a token at -> http://localhost:3000/token' ){
        return res.status(401).send(error.message);
    }
    if (error.message === 'Owner already exists' || error.message === 'Pet already exists' ){
        return res.status(409).send(error.message);
    } 
    if (error.message === 'CPF must contain only numbers' || error.message === 'CPF must contain 11 characters' ){
        return res.status(409).send(error.message);
    } 
    if (error.message === 'Owner not found' || error.message === 'Pet not found' || error.message === 'Type of Animal not found'){
        return res.status(404).send(error.message);
    } 
    sendAlert(error.message);
    res.status(500).send(error.message);
    
});

app.listen(3000);
