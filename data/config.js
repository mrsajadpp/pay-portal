// db.js
const mongoose = require('mongoose');

(async () => {
    try {
        mongoose.connection.on('connected', () => {
            // Set the database name if using the mongodb+srv protocol
            if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
                mongoose.connection.db = mongoose.connection.client.db(process.env.DB_NAME);
            }
            console.log('Connection to MongoDB established.');
        });

        await mongoose.connect(process.env.DB_STRING);

        console.log('🧠 MongoDB connected');
    } catch (error) {
        console.error('🔴 Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
})();

module.exports = mongoose;