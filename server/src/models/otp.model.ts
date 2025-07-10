import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
interface Iotp {
  email: string;
  otp: string;
  expiresAt: Date;
  compareOTP(candidateOTP: string): Promise<Boolean>;
}

const otpSchema = new Schema<Iotp>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      minlength: 6,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 60 },
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();

  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
  next();
});

otpSchema.methods.compareOTP = async function (
  candidateOTP: string
): Promise<boolean> {
  return await bcrypt.compare(candidateOTP, this.otp);
};

const otpModel = model<Iotp>("OTP", otpSchema);
export default otpModel;
