const express = require('express');
const { verifyToken, verify_AdminComp } = require('../middlewares/auth');
const Products = require('../models/products');
const app = express();

//========================== Producto ==========================
// Agregar producto
// Eliminar producto
// Editar producto
// Obtener Productos


module.exports = app;