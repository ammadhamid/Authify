import { generateOTP } from "./otp.helper";
import { sendVerificationOtpEmail, sendResetOtpEmail } from "./mail.helper";

export const generateAndSendSignUpEmail = async (
  email: string
): Promise<void> => {
  const returnedOTP = await generateOTP(email);
  await sendVerificationOtpEmail({ to: email, otp: returnedOTP.otp });
  console.log(`OTP sent to : ${email}: ${returnedOTP.otp}`);
};

export const generateAndSendResetEmail = async (
  email: string
): Promise<void> => {
  const returnedOTP = await generateOTP(email);
  await sendResetOtpEmail({ to: email, otp: returnedOTP.otp });
  console.log(`OTP send to : ${email}`);
};
