const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

describe('Pruebas de la API', () => {
  
  test('GET /api/productos debe devolver una lista', async () => {
    const response = await axios.get(`${API_URL}/productos`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET /api/productos/1 debe devolver un producto', async () => {
    const response = await axios.get(`${API_URL}/productos/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('nombre');
  });

  test('POST /api/auth/register debe validar datos', async () => {
    try {
      await axios.post(`${API_URL}/auth/register`, {});
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});