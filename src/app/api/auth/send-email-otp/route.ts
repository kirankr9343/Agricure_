// In src/app/api/auth/send-email-otp/route.ts

import { NextResponse } from 'next/server';
import { getOrCreateFirebaseUserByEmail } from '@/lib/firebaseAdmin'; // safe helper
import dbConnect from '@/lib/dbConnect';       // Our new DB connection
import User from '@/models/User';              // Our new User model
import { sendOTPEmail } from '@/lib/emailService';
import otpGenerator from 'otp-generator';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ msg: 'Email is required' }, { status: 400 });
    }

    // 1. Connect to YOUR MongoDB
    await dbConnect();

    let userRecord;
    let userInOurDb;

    // 2. Find or Create the user in Firebase Auth (for security)
    // Use the safe helper which can return a development fallback user
    userRecord = await getOrCreateFirebaseUserByEmail(email);

    // 3. Find or Create the user in YOUR MongoDB
    userInOurDb = await User.findOne({ email: userRecord.email });
    
    if (!userInOurDb) {
      userInOurDb = new User({
        uid: userRecord.uid, // Link to Firebase Auth ID
        email: userRecord.email,
      });
    }

    // 4. Generate and save OTP to YOUR database
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    
    userInOurDb.otp = otp;
    userInOurDb.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    await userInOurDb.save(); // Save to MongoDB

    // 5. Send the OTP email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      // If email fails, return an error
      return NextResponse.json(
        { msg: 'Failed to send OTP email. Check server logs.' },
        { status: 500 }
      );
    }

    // If email succeeds, return success
    return NextResponse.json(
      { msg: 'OTP has been sent to your email.' },
      { status: 200 }
    );
  
  } catch (error: any) {
    console.error('Send Email OTP Error:', error);
    return NextResponse.json(
      { msg: 'Server error, please try again.' },
      { status: 500 }
    );
  }
}