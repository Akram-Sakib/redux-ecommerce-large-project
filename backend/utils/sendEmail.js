const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMRT_SERVICE,
    auth: {
      user: process.env.SMRT_MAIL,
      pass: process.env.SMRT_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMRT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
