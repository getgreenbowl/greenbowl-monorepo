import { APP_SETTINGS } from "../core/app-settings";
import EmailLogger from "../core/logger/email-logger";
const nodemailer = require("nodemailer");

const nodemailerTransporter = nodemailer.createTransport({
  host: APP_SETTINGS.SENDER_EMAIL_HOST,
  port: APP_SETTINGS.SENDER_EMAIL_PORT,
  secure: true,
  auth: {
    user: APP_SETTINGS.SENDER_EMAIL_ID,
    pass: APP_SETTINGS.SENDER_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export const sendEmail = async (mailData: any) => {
  try {
    if (!mailData) {
      return false;
    }

    let mailOptions = {
      from: APP_SETTINGS.SENDER_EMAIL_ID,
      to: mailData.to,
      subject: "Tashan Email",
      html: mailData.html,
    };

    const res = await nodemailerTransporter.sendMail(mailOptions);
    EmailLogger.write({
      res,
      mailOptions,
    });
    return res;
  } catch (error: any) {
    EmailLogger.write({
      type: "error",
      error,
      mailData,
    });
    throw error;
  }
};
