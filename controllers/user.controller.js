const User = require("../models/user.model");

const CreateUser = async (req, res) => {
  try {
    const { username, email, dateOfBirth } = req.body;

    const newUser = new User({
      username,
      email,
      dateOfBirth: new Date(dateOfBirth),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    CreateUser,
    GetAllUsers,
}