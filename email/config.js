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

// Export the functions for use in other modules
module.exports = { newEmployee, newCustomer, dataUpdated };
