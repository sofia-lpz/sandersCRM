require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();
const port = 1233;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send thank you email
const sendThankYouEmail = (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You!',
    text: 'Thank you for your support!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
};

// Route to send thank you emails
app.get('/send-emails', (req, res) => {
  const query = 'SELECT mail FROM contacts';

  db.query(query, (error, results) => {
    if (error) throw error;

    results.forEach(row => {
      sendThankYouEmail(row.mail);
    });

    res.send('Thank you emails have been sent.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
