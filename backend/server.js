require('dotenv').config();
const express = require('express');
const cors = require('cors');
const presupuestoRoutes = require('./routes_presupuesto');
const gastosFijosRoutes = require('./routes_gastosFijos');
const gastosSemanalesRoutes = require('./routes_gastosSemanales');
const usuariosRoutes = require('./routes_usuarios');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/presupuesto', presupuestoRoutes);
app.use('/api/gastos-fijos', gastosFijosRoutes);
app.use('/api/gastos-semanales', gastosSemanalesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Control de Gastos funcionando');
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
