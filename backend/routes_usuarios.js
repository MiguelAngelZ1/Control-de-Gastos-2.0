const express = require('express');
const router = express.Router();
const db = require('./db');

// Obtener un usuario por nombre
router.get('/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ error: 'El nombre de usuario es requerido' });
        }
        
        // Verificar si el usuario ya existe
        const [existingUser] = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }
        
        // Crear el usuario
        const [result] = await db.query('INSERT INTO usuarios (nombre) VALUES (?)', [nombre]);
        
        res.status(201).json({
            id: result.insertId,
            nombre,
            fecha_creacion: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Eliminar un usuario
router.delete('/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        
        // Verificar si el usuario existe
        const [existingUser] = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        // Eliminar el usuario
        await db.query('DELETE FROM usuarios WHERE nombre = ?', [nombre]);
        
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;
