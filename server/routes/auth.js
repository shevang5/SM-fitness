const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ProgressEntry = require('../models/ProgressEntry');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, age, weight } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'member',
            age: age ? Number(age) : undefined
        });

        await user.save();

        // If weight is provided at registration, create initial progress entry
        if (weight) {
            const entry = new ProgressEntry({
                userId: user.id,
                type: 'weight',
                value: Number(weight),
                unit: 'kg', // Default unit
                notes: 'Initial weight at registration'
            });
            await entry.save();
        }

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Current User
router.get('/me', async (req, res) => {
    try {
        // We need middleware to extract ID, but for now let's assume we pass ID or use a middleware.
        // Wait, we didn't add auth middleware globally yet.
        // Let's assume the token is passed and we verify it here briefly or use a middleware file.
        // For speed, let's verify token inline.
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ msg: 'No token' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
});

module.exports = router;
