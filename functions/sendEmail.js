// functions/sendEmail.js

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');  // Replace with your SendGrid API key HIDE IT IN ENV FILE LATER!

const sendWelcomeEmail = async (user) => {
  const msg = {
    to: user.email,
    from: 'melanomasocietyaustralia@outlook.com', // Replace with your email
    subject: 'Welcome to Our Service!',
    text: `Hello ${user.displayName || 'User'},\n\nWelcome to our platform! We're glad to have you with us.`,
    html: `<p>Hello ${user.displayName || 'User'},</p><p>Welcome to our platform! We're glad to have you with us.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Welcome email sent to:', user.email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendWelcomeEmail };