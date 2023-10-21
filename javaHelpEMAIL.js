const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Configure the nodemailer transporter with your email service credentials
    const transporter = nodemailer.createTransport({
        host: 'Outlook.com', // e.g., 'smtp.your-email-service.com'
        port: 587, // Use the appropriate port for your email service
        secure: true, // Set to true if your service uses SSL
        auth: {
            user: 'your-email@example.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: 'sparkzAgency@outlook.com', // Replace with the recipient's email
        subject: 'New Client Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Email not sent. An error occurred.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Submission successful');
        }
    });

    // You can also store the data in a     database or perform other actions here

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
