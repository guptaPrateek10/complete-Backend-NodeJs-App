const User = require("../model/userModel");

const getUserProfile = (req, res) => {
  const { _id, role, ...other } = req.user._doc;
  res.status(200).json(other);
};

const getAllUserProfiles = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { getUserProfile, getAllUserProfiles };
