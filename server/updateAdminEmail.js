const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gym-tracker');

        const specificId = "6938fd5bd557070d0fe96476";

        const user = await User.findById(specificId);
        if (user) {
            user.email = 'admin@gym.com';
            await user.save();
            console.log('Updated admin email to admin@gym.com');
        } else {
            console.log('User not found');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateAdmin();
