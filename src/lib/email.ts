import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_UKR_NET_EMAIL_USER,
    pass: process.env.UKR_NET_EMAIL_PASSWORD,
  },
});
