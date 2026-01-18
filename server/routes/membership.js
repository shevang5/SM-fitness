const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AccessCode = require('../models/AccessCode');

// Activate Membership Code
router.post('/activate', async (req, res) => {
    const { userId, code } = req.body;

    try {
        const accessCode = await AccessCode.findOne({ code });
        if (!accessCode) return res.status(404).json({ msg: 'Invalid Code' });
        if (accessCode.status === 'USED') return res.status(400).json({ msg: 'Code already used' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Apply Membership
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + accessCode.planDuration);

        user.membership = {
            isActive: true,
            planName: 'Activated Plan', // Could specific plan name in AccessCode if schema updated
            startDate: startDate,
            endDate: endDate
        };

        await user.save();

        // Mark Code as Used
        accessCode.status = 'USED';
        accessCode.usedBy = userId;
        accessCode.activatedAt = new Date();
        await accessCode.save();

        res.json({ msg: 'Membership activated successfully', user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
