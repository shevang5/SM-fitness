const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const restoreAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gym-tracker');

        const specificId = "6938fd5bd557070d0fe96476";

        // Check if it exists largely just in case
        const existing = await User.findById(specificId);
        if (existing) {
            console.log('User with this ID already exists. No action needed.');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt); // Defaulting to admin123, user provided email/role but not pass, assuming standard.

        const admin = new User({
            _id: specificId, // Force the specific ID
            name: 'admin',
            email: 'admin@admin.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log(`Admin Restored with ID: ${specificId}`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

restoreAdmin();
