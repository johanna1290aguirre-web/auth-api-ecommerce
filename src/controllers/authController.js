const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = (req, res) => {
  const { nombre, email, password } = req.body;

  console.log('📥 Datos recibidos en registro:', { nombre, email, password });

  if (!nombre || !email || !password) {
    console.log('❌ Campos faltantes');
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('❌ Error en SELECT:', err);
      return res.status(500).json({ error: 'Error al verificar email' });
    }

    console.log('🔍 Resultado de verificación:', results);

    if (results.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('🔐 Contraseña encriptada:', hashedPassword);

    db.query(
      'INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, hashedPassword, 'cliente', true],
      (err, result) => {
        if (err) {
          console.error('❌ Error en INSERT:', err);
          return res.status(500).json({ error: 'Error al registrar usuario' });
        }

        console.log('✅ Usuario insertado con ID:', result.insertId);

        res.status(201).json({
          message: 'Usuario registrado exitosamente',
          id: result.insertId
        });
      }
    );
  });
};

// Inicio de sesión
exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Intento de login:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ? AND activo = true', [email], (err, results) => {
    if (err) {
      console.error('❌ Error en SELECT login:', err);
      return res.status(500).json({ error: 'Error al buscar usuario' });
    }

    console.log('📦 Usuario encontrado:', results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const usuario = results[0];
    console.log('👤 Usuario:', usuario.email);
    console.log('🔑 Contraseña en BD:', usuario.password);
    console.log('🔑 Contraseña ingresada:', password);

    const passwordValida = bcrypt.compareSync(password, usuario.password);

    console.log('✅ Contraseña válida?:', passwordValida);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  });
};