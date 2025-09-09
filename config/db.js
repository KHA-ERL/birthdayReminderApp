const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI && String(process.env.MONGODB_URI).trim();

// connect to mongodb
function connectToMongoDB() {
    if (!MONGODB_URI) {
        console.error('MONGODB_URI env var is not set. Set it in Render or your .env file.');
        process.exit(1);
    }

    if (!/^mongodb(\+srv)?:\/\//.test(MONGODB_URI)) {
        console.error('Invalid MONGODB_URI. It must start with "mongodb://" or "mongodb+srv://"');
        process.exit(1);
    }

    mongoose
        .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
        .catch((err) => {
            console.error('Initial MongoDB connection error:', err);
            process.exit(1);
        });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Error connecting to MongoDB', err);
    });
}

module.exports = {
    connectToMongoDB,
};
