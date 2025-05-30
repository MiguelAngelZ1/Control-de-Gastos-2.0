const express = require('express');
const pool = require('./db');
const router = express.Router();

// GET todos los gastos semanales de una persona
router.get('/:persona', async (req, res) => {
  const { persona } = req.params;
  try {
    const result = await pool.query('SELECT * FROM gastos_semanales WHERE persona = $1 ORDER BY semana, id', [persona]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en gastos semanales:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

// POST nuevo gasto semanal
router.post('/:persona', async (req, res) => {
  const { persona } = req.params;
  const { semana, descripcion, monto, fecha } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gastos_semanales (persona, semana, descripcion, monto, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [persona, semana, descripcion, monto, fecha]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en gastos semanales:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

// DELETE gasto semanal
router.delete('/:persona/:id', async (req, res) => {
  const { persona, id } = req.params;
  try {
    await pool.query('DELETE FROM gastos_semanales WHERE id=$1 AND persona=$2', [id, persona]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error en gastos semanales:', err); // Log para Render
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
