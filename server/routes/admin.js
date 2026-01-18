const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AccessCode = require('../models/AccessCode');

// Helper to generate random code
const generateUniqueCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result; // Format: XXXXXXXX
};

// Generate Code (Start Today OR Flexible)
router.post('/generate-code', async (req, res) => {
    const { userId, type, planDuration, planName, generatedBy } = req.body;
    // type: 'IMMEDIATE' or 'FLEXIBLE'

    try {
        if (type === 'IMMEDIATE') {
            if (!userId) return res.status(400).json({ msg: 'User ID required for Immediate start' });

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ msg: 'User not found' });

            // Start NOW
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + parseInt(planDuration));

            user.membership = {
                isActive: true,
                planName: planName || 'Standard Plan',
                startDate: startDate,
                endDate: endDate
            };

            await user.save();
            return res.json({ msg: 'Membership activated immediately', user });

        } else if (type === 'FLEXIBLE') {
            let code = generateUniqueCode();
            // Ensure specific format if desired (e.g. 3-3-3 chars) or uniqueness check
            // Simple check loop:
            let existing = await AccessCode.findOne({ code });
            while (existing) {
                code = generateUniqueCode();
                existing = await AccessCode.findOne({ code });
            }

            const newCode = new AccessCode({
                code,
                type: 'FLEXIBLE',
                planDuration,
                generatedBy
            });

            await newCode.save();
            return res.json({ msg: 'Flexible Access Code generated', code: newCode });
        } else {
            return res.status(400).json({ msg: "Invalid Type" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Members (Sorted by days remaining)
router.get('/members', async (req, res) => {
    try {
        const users = await User.find({ role: 'member' }).select('-password');

        // Sort logic needs to happen in JS because 'daysRemaining' is a virtual
        const sortedUsers = users.sort((a, b) => {
            // Prioritize: 
            // 1. Active but expiring soon (ascending daysRemaining)
            // 2. Expired (negative daysRemaining) (could be at bottom or top depending on preference, usually top for "chasing")
            // Let's just do pure ascending daysRemaining. 
            // If no membership, treat as infinity or very low? 
            // Let's treat undefined endDate as infinity (bottom of list)

            const daysA = a.membership.endDate ? a.daysRemaining : 9999;
            const daysB = b.membership.endDate ? b.daysRemaining : 9999;

            return daysA - daysB;
        });

        res.json(sortedUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

// Update membership for a user (set endDate or add days)
router.put('/members/:id/membership', async (req, res) => {
    try {
        const userId = req.params.id;
        const { endDate, addDays, planName, isActive } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Ensure membership object exists
        if (!user.membership) user.membership = {};

        if (typeof isActive !== 'undefined') user.membership.isActive = !!isActive;
        if (planName) user.membership.planName = planName;

        if (endDate) {
            user.membership.endDate = new Date(endDate);
        } else if (addDays) {
            const currentEnd = user.membership.endDate ? new Date(user.membership.endDate) : new Date();
            const newEnd = new Date(currentEnd);
            newEnd.setDate(newEnd.getDate() + parseInt(addDays));
            user.membership.endDate = newEnd;
            // If there was no startDate, set it to now when adding days
            if (!user.membership.startDate) user.membership.startDate = new Date();
            user.membership.isActive = true;
        }

        await user.save();

        res.json({ msg: 'Membership updated', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
