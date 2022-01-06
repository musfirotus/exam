require('dotenv').config();
import { createTransport } from 'nodemailer'
import SMTPTransport = require('nodemailer/lib/smtp-transport');

interface EmailNotificationPayload {
  to: string;
  subject: string;
  html: string;
  context: {
    jadwal: string;
    tanggal: string;
    nama: string;
  }
}

export class NodemailService {
  static config(): SMTPTransport.Options {
    const options: SMTPTransport.Options = {
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    };

    return options;
  }

  static async newNodemailTransporter() {
    try {
      const transport = createTransport(this.config());

      return transport;
    } catch (error) {
      throw new Error(error); 
    }
  }

  static async sendMail(payload: EmailNotificationPayload) {
    try {
      await (await this.newNodemailTransporter()).sendMail({
        from: process.env.SMTP_USER,
        to: payload.to,
        subject: payload.subject,
        html: payload.html
      });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
