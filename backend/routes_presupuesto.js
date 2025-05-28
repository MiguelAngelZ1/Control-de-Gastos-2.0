const express = require('express');
const pool = require('../db'); // Corregido: './db' para consistencia
const router = express.Router();

// GET presupuesto de una persona
router.get('/:persona', async (req, res) => {
  const { persona } = req.params;
  try {
    const result = await pool.query('SELECT * FROM presupuesto WHERE persona = $1', [persona]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST presupuesto de una persona (body: { persona, monto })
router.post('/', async (req, res) => {
  const { persona, monto } = req.body;
  if (!persona || typeof monto !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO presupuesto (persona, monto)
       VALUES ($1, $2)
       ON CONFLICT (persona) DO UPDATE SET monto = EXCLUDED.monto
       RETURNING *`,
      [persona, monto]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
