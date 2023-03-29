import 'dotenv/config.js'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: process.env.EMAIL_MAILING,
      pass: process.env.PASSWORD_MAILING
  },
  tls:{
    rejectUnauthorized: false
  }
})

export default transporter
