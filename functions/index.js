import functions from 'firebase-functions';
import { sendWelcomeEmail } from './sendEmail';

export const sendWelcomeEmailTrigger = functions.auth.user().onCreate(async (user) => {
  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
});