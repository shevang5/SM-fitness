const mongoose = require('mongoose');

const AccessCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['IMMEDIATE', 'FLEXIBLE'],
        required: true
    },
    planDuration: {
        type: Number, // in days
        required: true
    },
    status: {
        type: String,
        enum: ['UNUSED', 'USED'],
        default: 'UNUSED'
    },
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    usedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activatedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('AccessCode', AccessCodeSchema);
