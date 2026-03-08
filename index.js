const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/config/database');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

dotenv.config();

console.log('🔍 Variables de entorno cargadas:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '✓ Configurada' : '✗ VACÍA');
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://ecommerce-saludable-react.vercel.app',
  credentials: true
}));

// Rutas de la API
app.use('/api/productos', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carrito', cartRoutes);  // ✅ Acá va, después de definir app

app.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Ecommerce Saludable funcionando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Prueba el servidor en http://localhost:${PORT}/ping`);
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Ecommerce Saludable funcionando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Prueba el servidor en http://localhost:${PORT}/ping`);
});