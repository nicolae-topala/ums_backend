import nodemailer from "nodemailer";
import logger from "./logger";

const smtpTransport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "proawp5415@gmail.com",
    pass: "xsmtpsib-0e2a9868b088e909e5543bce03536286b5bd9e6914c0e75f9dca1350ed15c03b-8H5pNBDJYmSgxy7r",
  },
});

export async function sendResetPassword(receiver: string, token: string) {
  try {
    await smtpTransport.sendMail({
      from: "proawp5415@gmail.com",
      to: receiver,
      subject: "Reset Password",
      html: `<body><h1></h1><p>This is the token ${token}</p></body>`,
    });

    return true;
  } catch (e: any) {
    logger.error(e);
  }
}
