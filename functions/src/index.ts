import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Store OTP codes in Firestore
const otpCollection = admin.firestore().collection('otp_codes');

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: functions.config().email?.user || 'your-email@gmail.com',
    pass: functions.config().email?.pass || 'your-app-password'
  }
});

// Generate OTP code
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
export const sendOTPEmail = functions.https.onCall(async (data, context) => {
  try {
    const { email, name } = data;
    
    if (!email || !name) {
      throw new functions.https.HttpsError('invalid-argument', 'Email and name are required');
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    );

    // Store OTP in Firestore
    await otpCollection.doc(email).set({
      otp,
      expiresAt,
      attempts: 0
    });

    // Send email
    const mailOptions = {
      from: functions.config().email?.user || 'your-email@gmail.com',
      to: email,
      subject: 'Muvr - Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #35179d;">Welcome to Muvr! 🎉</h2>
          <p>Hi ${name},</p>
          <p>Your email verification code is:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #35179d; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Best regards,<br>The Muvr Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send OTP');
  }
});

// Verify OTP
export const verifyOTP = functions.https.onCall(async (data, context) => {
  try {
    const { email, otp } = data;
    
    if (!email || !otp) {
      throw new functions.https.HttpsError('invalid-argument', 'Email and OTP are required');
    }

    // Get OTP from Firestore
    const otpDoc = await otpCollection.doc(email).get();
    
    if (!otpDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'OTP not found or expired');
    }

    const otpData = otpDoc.data();
    
    if (!otpData) {
      throw new functions.https.HttpsError('not-found', 'OTP data not found');
    }

    // Check if OTP is expired
    if (otpData.expiresAt.toDate() < new Date()) {
      await otpCollection.doc(email).delete();
      throw new functions.https.HttpsError('deadline-exceeded', 'OTP has expired');
    }

    // Check attempts
    if (otpData.attempts >= 3) {
      await otpCollection.doc(email).delete();
      throw new functions.https.HttpsError('permission-denied', 'Too many attempts');
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      // Increment attempts
      await otpCollection.doc(email).update({
        attempts: admin.firestore.FieldValue.increment(1)
      });
      throw new functions.https.HttpsError('invalid-argument', 'Invalid OTP');
    }

    // OTP is valid - delete it and mark email as verified
    await otpCollection.doc(email).delete();

    // Update user's email verification status
    const userQuery = await admin.firestore()
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!userQuery.empty) {
      const userDoc = userQuery.docs[0];
      await userDoc.ref.update({
        emailVerified: true,
        emailVerifiedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    return { success: true, message: 'Email verified successfully' };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
});

// Resend OTP
export const resendOTP = functions.https.onCall(async (data, context) => {
  try {
    const { email, name } = data;
    
    if (!email || !name) {
      throw new functions.https.HttpsError('invalid-argument', 'Email and name are required');
    }

    // Delete existing OTP if any
    await otpCollection.doc(email).delete();

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    );

    // Store new OTP
    await otpCollection.doc(email).set({
      otp,
      expiresAt,
      attempts: 0
    });

    // Send new email
    const mailOptions = {
      from: functions.config().email?.user || 'your-email@gmail.com',
      to: email,
      subject: 'Muvr - New Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #35179d;">New Verification Code</h2>
          <p>Hi ${name},</p>
          <p>Your new email verification code is:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #35179d; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Best regards,<br>The Muvr Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: 'New OTP sent successfully' };
  } catch (error) {
    console.error('Error resending OTP:', error);
    throw new functions.https.HttpsError('internal', 'Failed to resend OTP');
  }
});
