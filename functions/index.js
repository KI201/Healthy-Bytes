// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { sendWelcomeEmail } = require('./sendEmail');  // Import SendGrid service

admin.initializeApp();

// Firebase trigger: Send a welcome email when a new user registers
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  try {
    await sendWelcomeEmail(user);  // Call SendGrid to send the email
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
});
