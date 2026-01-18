const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ProgressEntry = require('../models/ProgressEntry');

// Create a progress entry
router.post('/', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ msg: 'No token' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        const { date, type, value, unit, notes } = req.body;
        const entry = new ProgressEntry({ userId, date: date || Date.now(), type, value, unit, notes });
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all entries for current user (optional filter by type)
router.get('/', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ msg: 'No token' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;
        const role = decoded.user.role;

        let targetUserId = userId;
        if (role === 'admin' && req.query.userId) {
            targetUserId = req.query.userId;
        }

        const filter = { userId: targetUserId };
        if (req.query.type) filter.type = req.query.type;

        const entries = await ProgressEntry.find(filter).sort({ date: 1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
