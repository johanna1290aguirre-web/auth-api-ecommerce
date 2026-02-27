const db = require('../config/database');

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM productos WHERE activo = true', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
};

// Obtener un producto por ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ? AND activo = true', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
};