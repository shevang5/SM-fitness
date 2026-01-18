const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gym-tracker');

        // Check if admin exists
        const existing = await User.findOne({ email: 'admin@gym.com' });
        if (existing) {
            console.log('Admin already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const admin = new User({
            name: 'Super Admin',
            email: 'admin@gym.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin User Created: admin@gym.com / admin123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
