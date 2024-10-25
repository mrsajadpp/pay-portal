const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    projectDescription: {
        type: String,
        required: true,
        trim: true,
    },
    projectRequirements: {
        type: String,
        required: true,
        trim: true,
    },
    customerId: {
        type: String,
        required: true,
        trim: true,
        ref: 'Customer', 
    },
    projectAmount: {
        type: String,
        required: true,
        min: 250, // Ensures that the amount is non-negative
    },
    maxDuration: {
        type: String,
        required: true,
        min: 1, // Ensures that duration is at least 1 day
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
