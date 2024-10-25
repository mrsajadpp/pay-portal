const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming projectId refers to a project document
        required: true,
        ref: 'Project', // Reference to the Project model
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming customerId refers to a customer document
        required: true,
        ref: 'Customer', // Reference to the Customer model
    },
    amount: {
        type: Number,
        required: true,
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'], // Status options for the invoice
        default: 'Pending',
    },
    notes: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Invoice = mongoose.model('InvoiceBin', invoiceSchema);

module.exports = Invoice;
