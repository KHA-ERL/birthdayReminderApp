const User = require("../models/user.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const checkBirthdays = async () => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();

    // Find users whose birthday is today (regardless of year)
    const users = await User.find();
    const birthdayUsers = users.filter((user) => {
      const dob = new Date(user.dateOfBirth);
      return dob.getMonth() + 1 === month && dob.getDate() === day;
    });

    console.log(`Found ${birthdayUsers.length} users with birthdays today`);
    // Send email to each user
    for (const user of birthdayUsers) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "🎂 Happy Birthday!",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h1 style="color: #ff6b6b; text-align: center;">Happy Birthday, ${user.username}! 🎉</h1>
              <p style="font-size: 16px; line-height: 1.5; text-align: center;">
                Wishing you a fantastic day filled with joy and laughter!
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <img src="https://source.unsplash.com/400x200/?birthday,celebration" alt="Birthday celebration" style="max-width: 100%; border-radius: 8px;">
              </div>
              <p style="font-size: 16px; text-align: center;">
                Thank you for being a valued customer. Enjoy your special day!
              </p>
              <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
                This is an automated message from the Birthday Reminder App.
              </p>
            </div>
          `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Birthday email sent to ${user.email}`);
    }
  } catch (err) {
    console.error("Error in birthday checker:", err);
  }
};

module.exports = { 
    checkBirthdays
 };
