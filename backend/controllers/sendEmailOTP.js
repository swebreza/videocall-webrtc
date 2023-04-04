const nodemailer = require('nodemailer')
const randomstring = require('randomstring')

// const otpCache = process.env.OTP_CACHE

function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  })
}

async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`OTP sent to ${email}`)
  } catch (err) {
    console.log(err)
  }
}

exports.sendOTP = (req, res) => {
  const { email } = req.body
  const otp = generateOTP()
  process.env.OTP_CACHE = otp
  sendOTP(email, otp)
  // return res.send('OTP sent')
  return res.status(200).json({
    message: 'OTP sent',
    // otp: process.env.OTP_CACHE,
  })
}
