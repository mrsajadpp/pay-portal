const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password or Gmail password
    },
});

// Function to send email to new employees
const newEmployee = async (fullname, recipientEmail) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: recipientEmail, // Recipient address
            subject: "Data Upload Confirmation", // Subject line
            text: `Hi ${fullname},\n\nYour data has been successfully uploaded to Grovix Lab's employees database.\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nThank you!`, // Plain text body
            html: `<p>Hi ${fullname},</p><p>Your data has been successfully uploaded to Grovix Lab's employees database.</p><p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p><p>Thank you!</p>`, // HTML version if needed
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Employee email sent:', info.response);
    } catch (error) {
        console.error('Error sending employee email:', error);
    }
};

// Function to send email to new customers
const newCustomer = async (fullname, recipientEmail) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: recipientEmail, // Recipient address
            subject: "Data Upload Confirmation", // Subject line
            text: `Dear ${fullname},\n\nYour data has been successfully uploaded to Grovix Lab's customers management database.\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nThank you!`, // Plain text body
            html: `<p>Dear ${fullname},</p><p>Your data has been successfully uploaded to Grovix Lab's customers management database.</p><p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p><p>Thank you!</p>`, // HTML version if needed
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Customer email sent:', info.response);
    } catch (error) {
        console.error('Error sending customer email:', error);
    }
};

// Function to send email when data has been updated
const dataUpdated = async (fullname, recipientEmail) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: recipientEmail, // Recipient address
            subject: "Data Update Notification", // Subject line
            text: `Dear ${fullname},\n\nYour data has been successfully updated in Grovix Lab's management database.\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nThank you!`, // Plain text body
            html: `<p>Dear ${fullname},</p><p>Your data has been successfully updated in Grovix Lab's management database.</p><p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p><p>Thank you!</p>`, // HTML version if needed
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Update notification email sent:', info.response);
    } catch (error) {
        console.error('Error sending update notification email:', error);
    }
};

// Function to send email when a project starts
const projectStarted = async (fullname, recipientEmail, projectTitle, amount, requirements, description) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: recipientEmail, // Recipient address
            subject: "Project Started Notification", // Subject line
            text: `Dear ${fullname},\n\nWe are pleased to inform you that your project titled "${projectTitle}" has officially started. Here are the project details:\n\n- **Budget**: ${amount}\n- **Requirements**: ${requirements}\n- **Description**: ${description}\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nThank you for choosing Grovix Lab!`,
            html: `<p>Dear ${fullname},</p><p>We are pleased to inform you that your project titled <strong>${projectTitle}</strong> has officially started. Here are the project details:</p><ul><li><strong>Budget</strong>: ${amount}</li><li><strong>Requirements</strong>: ${requirements}</li><li><strong>Description</strong>: ${description}</li></ul><p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p><p>Thank you for choosing Grovix Lab!</p>`, // HTML version if needed
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Project started email sent:', info.response);
    } catch (error) {
        console.error('Error sending project started email:', error);
    }
};

// Function to notify the project manager when the project starts
const notifyProjectManager = async (managerEmail, projectTitle, clientName, amount, requirements, description) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: managerEmail, // Project manager's email address
            subject: "New Project Started: Project Notification", // Subject line
            text: `Hello Project Manager,\n\nA new project titled "${projectTitle}" has started with the following details:\n\n- **Client**: ${clientName}\n- **Budget**: ${amount}\n- **Requirements**: ${requirements}\n- **Description**: ${description}\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nBest Regards,\nGrovix Lab`,
            html: `<p>Hello Project Manager,</p><p>A new project titled <strong>${projectTitle}</strong> has started with the following details:</p><ul><li><strong>Client</strong>: ${clientName}</li><li><strong>Budget</strong>: ${amount}</li><li><strong>Requirements</strong>: ${requirements}</li><li><strong>Description</strong>: ${description}</li></ul><p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p><p>Best Regards,<br>Grovix Lab</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Project started email sent to project manager:', info.response);
    } catch (error) {
        console.error('Error sending project started email to project manager:', error);
    }
};

// Export the functions for use in other modules
module.exports = { newEmployee, newCustomer, dataUpdated, projectStarted, notifyProjectManager };
