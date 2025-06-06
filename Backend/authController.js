const nodemailer = require('nodemailer');

const otps = {}; 

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  
  const transporter = nodemailer.createTransport({ /* ... */ });
  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`
  });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // 1. Validate email/password
  const user = await User.findOne({ email, password }); // Add proper hashing & checks!
  if (!user) return res.status(401).json({ status: "INVALID_CREDENTIALS" });

  // 2. Generate & send OTP
  const otp = generateOTP();
  otps[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry
  await sendOTPEmail(email, otp);

  res.json({ status: "OTP_SENT" });
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otps[email];
  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return res.status(401).json({ status: "INVALID_OTP" });
  }
  delete otps[email]; // Clean up
  // Create session/JWT here
  res.json({ status: "AUTHENTICATED" });
};