const nodemailer = require("nodemailer");

const createEmailTemplate = (mealType, mealLink) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1 style="color: #4CAF50;">Meal Reminder</h1>
      <p style="font-size: 18px;">Hello,</p>
      <p style="font-size: 18px;">You have one meal planned for <a href=${mealLink} target="_blank"> <strong style="color: #4CAF50;">${mealType}</strong>.</a></p>
      <p style="font-size: 18px;">Enjoy your meal!</p>
      <p style="font-size: 18px;">Best,</p>
      <p style="font-size: 18px;">CookIT Team</p>
    </div>
  `;
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "pendurkarpratik04@gmail.com",
    to: options.email,
    subject: options.subject,
    html: createEmailTemplate(options.mealType, options.mealLink),
  };

  console.log("Mail options: ", mailOptions);
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
