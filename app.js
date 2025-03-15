const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cron = require("node-cron");
const db = require("./config/db");
const userRoutes = require("./routes/user.route");
const birthdayChecker = require("./cron/birthdayChecker");

// Database connection
 db.connectToMongoDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Schedule cron job to run at 7am every day
cron.schedule("0 7 * * *", () => {
  console.log("Running birthday checker...");
  birthdayChecker.checkBirthdays();
});

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
