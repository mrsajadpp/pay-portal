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
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Upload Confirmation - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f3f3f3; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f3f3f3; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Hi <strong>${fullname}</strong>,</p>
                <p>Your data has been successfully uploaded to Grovix Lab's employee database.</p>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Thank you for being a valuable part of Grovix Lab.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                              <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">

                <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`, // HTML version if needed
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
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Upload Confirmation - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Dear <strong>${fullname}</strong>,</p>
                <p>Your data has been successfully uploaded to Grovix Lab's customers management database.</p>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Thank you for trusting Grovix Lab.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                
                <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">
              <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`, // HTML version if needed
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
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Update Notification - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Dear <strong>${fullname}</strong>,</p>
                <p>Your data has been successfully updated in Grovix Lab's management database.</p>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Thank you for trusting Grovix Lab.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">
              <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`, // HTML version if needed
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
            text: `Dear ${fullname},\n\nWe are pleased to inform you that your project titled "${projectTitle}" has officially started. Here are the project details:\n\n- **Budget**: ₹${amount}/-\n- **Requirements**: ${requirements}\n- **Description**: ${description}\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nThank you for choosing Grovix Lab!`,
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Started Notification - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Dear <strong>${fullname}</strong>,</p>
                <p>We are pleased to inform you that your project titled <strong>${projectTitle}</strong> has officially started. Here are the project details:</p>
                <ul>
                    <li><strong>Budget</strong>: ₹${amount}/-</li>
                    <li><strong>Requirements</strong>: ${requirements}</li>
                    <li><strong>Description</strong>: ${description}</li>
                </ul>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Thank you for choosing Grovix Lab!</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">
                <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`, // HTML version if needed
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
            text: `Hello Project Manager,\n\nA new project titled "${projectTitle}" has started with the following details:\n\n- **Client**: ${clientName}\n- **Budget**: ₹${amount}/-\n- **Requirements**: ${requirements}\n- **Description**: ${description}\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nBest Regards,\nGrovix Lab`,
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Project Notification - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Hello Project Manager,</p>
                <p>A new project titled <strong>${projectTitle}</strong> has started with the following details:</p>
                <ul>
                    <li><strong>Client</strong>: ${clientName}</li>
                    <li><strong>Budget</strong>: ₹${amount}/-</li>
                    <li><strong>Requirements</strong>: ${requirements}</li>
                    <li><strong>Description</strong>: ${description}</li>
                </ul>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Best Regards,<br>Grovix Lab</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">
                <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Project started email sent to project manager:', info.response);
    } catch (error) {
        console.error('Error sending project started email to project manager:', error);
    }
};

// Function to send an invoice email
const sendInvoiceEmail = async (clientName, clientEmail, projectTitle, amountDue, dueDate, paymentLink) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: clientEmail, // Client's email address
            subject: "Invoice for Your Project with Grovix Lab", // Subject line
            text: `Dear ${clientName},\n\nWe hope this message finds you well. Please find the invoice details for your project "${projectTitle}" below:\n\n- **Amount Due**: ₹${amountDue}/-\n- **Due Date**: ${dueDate}\n\nTo proceed with the payment, you can use the following link:\n\n${paymentLink}\n\nAlternatively, you may arrange a direct transfer by contacting our Project Manager, Sadiq, at sadiq@grovixlab.com.\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nThank you for choosing Grovix Lab!`,
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice for Your Project - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
        .button { background-color: #0078e8; color: white; padding: 10px 15px; text-decoration: none; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Dear <strong>${clientName}</strong>,</p>
                <p>We hope this message finds you well. Please find the invoice details for your project titled "<strong>${projectTitle}</strong>" below:</p>
                <ul>
                    <li><strong>Amount Due</strong>: ₹${amountDue}/-</li>
                    <li><strong>Due Date</strong>: ${dueDate}</li>
                </ul>
                <p>To proceed with the payment, please use the link below:</p>
                <p><a href="${paymentLink}" class="button">Pay Now</a></p>
                <p>Alternatively, you may arrange a direct transfer by contacting our Project Manager, Sadiq, at <a href="mailto:sadiq@grovixlab.com">sadiq@grovixlab.com</a>.</p>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Thank you for choosing Grovix Lab!</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">
                <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Invoice email sent:', info.response);
    } catch (error) {
        console.error('Error sending invoice email:', error);
    }
};

// Function to send payment confirmation email
const sendPaymentConfirmationEmail = async (clientName, clientEmail, projectTitle, amountPaid) => {
    try {
        const mailOptions = {
            from: "Grovix Lab <noreply.grovix@gmail.com>", // Sender address
            to: clientEmail, // Client's email address
            subject: "Payment Confirmation for Your Project", // Subject line
            text: `Dear ${clientName},\n\nWe are pleased to confirm that your payment of ₹${amountPaid}/- has been successfully debited for the project titled "${projectTitle}".\n\nThank you for trusting Grovix Lab with your project. We appreciate your prompt payment and look forward to continuing our work together.\n\nThis email has been automatically generated. If you find any attachments or links, please avoid them.\n\nWarm regards,\nGrovix Lab`,
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation - Grovix Lab</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
        .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
        .content p { margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
        .footer img { margin-top: 10px; height: 20px; }
    </style>
</head>
<body>
    <table class="container" align="center">
        <tr>
            <td class="content">
                <p>Dear <strong>${clientName}</strong>,</p>
                <p>We are pleased to confirm that your payment of <strong>₹${amountPaid}/-</strong> has been successfully debited for the project titled "<strong>${projectTitle}</strong>".</p>
                <p>Thank you for trusting Grovix Lab with your project. We appreciate your prompt payment and look forward to continuing our work together.</p>
                <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                <p>Warm regards,<br>Grovix Lab</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <img src="https://grovixlab.com/img/grovix-lab.png" alt="Grovix Lab Logo">
                <p>© Grovix Lab. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Payment confirmation email sent:', info.response);
    } catch (error) {
        console.error('Error sending payment confirmation email:', error);
    }
};

// Export the functions for use in other modules
module.exports = { newEmployee, newCustomer, dataUpdated, projectStarted, notifyProjectManager, sendInvoiceEmail, sendPaymentConfirmationEmail };
