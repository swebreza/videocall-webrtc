const nodemailer = require('nodemailer')

// Store the OTP code and the user's email address in a temporary cache
// const otpCache = process.env.OTP_CACHE

// Verify the user's input OTP code against the stored OTP code
function verifyOTP(otp) {
  if (process.env.OTP_CACHE === otp) {
    // Invalidate the OTP code
    delete process.env.OTP_CACHE
    return true
  } else {
    return false
  }
}

exports.verifyotp = (req, res) => {
  const { email, otp } = req.body
  if (verifyOTP(otp)) {
    return res.status(200).json({
      message: 'OTP Verified',
      // otp: process.env.OTP_CACHE,
    })
  } else {
    return res.status(400).json({
      message: 'Invalid OTP',
      // otp: process.env.OTP_CACHE,
    })
  }
}
