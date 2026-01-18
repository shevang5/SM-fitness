const mongoose = require('mongoose');

const ProgressEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true }, // e.g., weight, squat, bench
    value: { type: Number, required: true },
    unit: { type: String },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ProgressEntry', ProgressEntrySchema);
