const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the associated invoice
        required: true,
        ref: 'Invoice', // Reference to the Invoice model
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['bank-transfer', 'offline', 'online'], // Enum for payment methods
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now, // Automatically set to current date
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'], // Status options for the payment
        default: 'Completed',
    },
    notes: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Payment = mongoose.model('PaymentBin', paymentSchema);

module.exports = Payment;
