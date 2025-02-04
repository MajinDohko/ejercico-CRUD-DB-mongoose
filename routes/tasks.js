const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Endpoint para crear una tarea
router.post('/create', async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint que nos devuelve todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener tareas por id
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint que nos permite marcar una tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el título de una tarea
router.put('/id/:_id', async (req, res) => {
    try {
        const { title } = req.body;
        const task = await Task.findByIdAndUpdate(req.params._id, { title }, { new: true });
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Endpoint que nos permite eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;