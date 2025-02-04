const express = require ('express');
const app = express();
const PORT = 8000;
require('dotenv').config();
const {dbConnection} = require('./config/config');
const routes = require('./routes');

app.use(express.json());

app.use('/', routes);

dbConnection();

app.listen(PORT, () => console.log (`Express está escuchando en el puerto ${PORT}`));