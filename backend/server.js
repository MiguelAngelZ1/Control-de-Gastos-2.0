require('dotenv').config();
const express = require('express');
const cors = require('cors');
const presupuestoRoutes = require('./routes_presupuesto');
const gastosFijosRoutes = require('./routes_gastosFijos');
const gastosSemanalesRoutes = require('./routes_gastosSemanales');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/presupuesto', presupuestoRoutes);
app.use('/api/gastos-fijos', gastosFijosRoutes);
app.use('/api/gastos-semanales', gastosSemanalesRoutes);

app.get('/', (req, res) => {
  res.send('API Control de Gastos funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
