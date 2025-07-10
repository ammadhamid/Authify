import otpModel from "../models/otp.model";

export const generateOTP = async (email: string) => {
  if (!email) {
    throw new Error("Email is Required");
  }

  let OTP = "";
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const leangth = digits.length;

  for (let i = 0; i <= 5; i++) {
    OTP += digits[Math.floor(Math.random() * leangth)];
  }

  console.log(OTP);

  const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

  await otpModel.deleteMany({ email });

  await otpModel.create({
    email: email,
    otp: OTP,
    expiresAt: expiryTime,
  });

  return { email, otp: OTP };
};
