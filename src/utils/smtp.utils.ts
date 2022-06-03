import nodemailer from "nodemailer";
import config from "config";
import logger from "./logger";

const smtpTransport = nodemailer.createTransport({
  host: config.get<string>("smtpHost"),
  port: config.get<number>("smtpPort"),
  auth: {
    user: config.get<string>("smtpUser"),
    pass: config.get<string>("smtpPass"),
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
