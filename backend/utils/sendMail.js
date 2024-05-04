import nodemailer from "nodemailer";

const sendMail = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mail =({
    from: `"ECOM-V1" <noreply@ecom-v1.com>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  transporter.sendMail(mail).catch((err)=>{
    console.log(err);
  })
};

export default sendMail;
