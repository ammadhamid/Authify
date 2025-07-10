import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string;
  otp: string;
}

export const sendResetOtpEmail = async ({
  to,
  otp,
}: SendMailOptions): Promise<void> => {
  try {
    if (!to || !otp) throw new Error("OTP and Mail is required");

    // ye globally vairbale me dalna hai mean function specific transporter nahi bananay globally available transporter banan hai
    // abhi ye kiye tha to error araha tha mail send krny me lekin isy thik krna hai
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_USER || "Authify App <ammadhamid721@gmail.com",
      to,
      subject: "Your OTP Code for Password Reset ",
      text: `Your OTP code is : ${otp}`,
      html: `<p>Your OTP code is:<b>${otp}</b> </p>`,
    };
    console.log("AAAAA");

    await transporter.sendMail(mailOptions);
    console.log("AAAAA2");
    console.log("Email Send to: ", to);
  } catch (error) {
    throw new Error("Error in Sending Email: ");
  }
};

export async function sendVerificationOtpEmail({
  to,
  otp,
}: SendMailOptions): Promise<void> {
  try {
    if (!to || !otp) throw new Error("OTP and User Mail is required");

    // ye globally vairbale me dalna hai mean function specific transporter nahi bananay globally available transporter banan hai
    // abhi ye kiye tha to error araha tha mail send krny me lekin isy thik krna hai
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || '"Auth App" <ammadhamid721@gmail.com>',
      to,
      subject: "Your OTP Code for completing SignUP",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <b>${otp}</b></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email Send to: ", to);
  } catch (error) {
    throw new Error("Error in sending mail ");
  }
}
