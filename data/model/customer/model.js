const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        country: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        pinCode: {
            type: String,
            required: true,
            trim: true,
        }
    },
    customerId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
