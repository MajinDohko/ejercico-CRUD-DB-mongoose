const express = require ('express');
const app = express();
const PORT = 8000;
require('dotenv').config();
const {dbConnection} = require('./config/config');
const router = require('./routes/tasks');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

dbConnection();

app.listen(PORT, () => console.log (`Express está escuchando en el puerto ${PORT}`));