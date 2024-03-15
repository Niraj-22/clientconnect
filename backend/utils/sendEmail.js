const nodemail = require("nodemailer");

const sendEmail = async ({ emailTo, subject, code = 0, content }) => {
  const transporter = nodemail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "customersegmentpro@gmail.com",
      pass: "ykim sdkw kuxn hdpa",
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
            <div>
            <h2>Welcome to Client Connect.</h2>
            <p>Use our services to get tailored marketting</p>
              <h3>Use this below code to ${content}</h3>
              <p><strong>Code : </strong>${code}</p>
            </div>
        `,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
