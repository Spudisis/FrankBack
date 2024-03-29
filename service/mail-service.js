const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false,
      tls: { rejectUnauthorized: false },
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.SITE_URL,
      text: '',
      html: `<div><h1>Для активации перейдите по ссылке</h1><a href="${link}">${link}</a></div>`,
    });
  }
  async sendRestoreCode(to, code) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: 'Восстановление пароля ' + process.env.SITE_URL,
      text: '',
      html: `<div><h1>Код для восстановления: ${code}</h1></div>`,
    });
  }
}
module.exports = new MailService();
