const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.user_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.user_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (user.role !== "admin") {
      return res.status(404).json({ message: "You do not have admin access" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = { authenticate ,authenticateAdmin};
