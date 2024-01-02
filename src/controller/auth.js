const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

//Register a new user ̰

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

//HandleLogin User

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { user_Id: user._id.toString(),user_role:user.role },
      process.env.SECRET_KEY,
      { expiresIn: "365d" }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
