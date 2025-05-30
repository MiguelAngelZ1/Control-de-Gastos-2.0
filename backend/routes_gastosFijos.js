const express = require('express');
const pool = require('./db');
const router = express.Router();

// GET todos los gastos fijos de una persona
router.get('/:persona', async (req, res) => {
  const { persona } = req.params;
  try {
    const result = await pool.query('SELECT * FROM gastos_fijos WHERE persona = $1 ORDER BY id', [persona]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en gastos fijos:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

// POST nuevo gasto fijo
router.post('/:persona', async (req, res) => {
  const { persona } = req.params;
  const { descripcion, monto, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gastos_fijos (persona, descripcion, monto, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [persona, descripcion, monto, estado]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en gastos fijos:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

// PUT editar gasto fijo
router.put('/:persona/:id', async (req, res) => {
  const { persona, id } = req.params;
  const { descripcion, monto, estado } = req.body;
  try {
    await pool.query(
      'UPDATE gastos_fijos SET descripcion=$1, monto=$2, estado=$3 WHERE id=$4 AND persona=$5',
      [descripcion, monto, estado, id, persona]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Error en gastos fijos:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

// DELETE gasto fijo
router.delete('/:persona/:id', async (req, res) => {
  const { persona, id } = req.params;
  try {
    await pool.query('DELETE FROM gastos_fijos WHERE id=$1 AND persona=$2', [id, persona]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error en gastos fijos:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
