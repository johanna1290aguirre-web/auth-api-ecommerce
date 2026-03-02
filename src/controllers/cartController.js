const db = require('../config/database');

// Agregar producto al carrito
exports.addToCart = (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;

  if (!usuario_id || !producto_id || !cantidad) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  db.query(
    'INSERT INTO carritos (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
    [usuario_id, producto_id, cantidad],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al agregar al carrito' });
      }
      res.status(201).json({ message: 'Producto agregado al carrito' });
    }
  );
};

// Obtener carrito de un usuario
exports.getCart = (req, res) => {
  const { usuario_id } = req.params;

  db.query(
    `SELECT c.*, p.nombre, p.precio, p.descripcion 
     FROM carritos c 
     JOIN productos p ON c.producto_id = p.id 
     WHERE c.usuario_id = ?`,
    [usuario_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener carrito' });
      }
      res.json(results);
    }
  );
};

// Eliminar producto del carrito
exports.removeFromCart = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM carritos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar' });
    }
    res.json({ message: 'Producto eliminado del carrito' });
  });
};