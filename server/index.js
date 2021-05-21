const express = require('express');
const app = express();

app.use('/', require('./route/ownerRoute'));

app.listen(3000);