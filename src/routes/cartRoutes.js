const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas del carrito
router.post('/agregar', cartController.addToCart);
router.get('/usuario/:usuario_id', cartController.getCart);
router.delete('/eliminar/:id', cartController.removeFromCart);

module.exports = router;