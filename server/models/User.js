const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    membership: {
        isActive: { type: Boolean, default: false },
        planName: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
    },
    age: {
        type: Number
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for days remaining
UserSchema.virtual('daysRemaining').get(function () {
    if (!this.membership.endDate) return 0;
    const now = new Date();
    const end = new Date(this.membership.endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
});

module.exports = mongoose.model('User', UserSchema);
