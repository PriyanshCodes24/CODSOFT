const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the name" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the email" });
    }
    const cleanEmail = email.toLowerCase().trim();
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the password" });
    }

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: cleanEmail,
      password: encryptedPassword,
    });

    const { password: _, ...safeUser } = user._doc;
    console.log("User registerd successfully:", safeUser);

    res.status(201).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the email" });
    }
    const cleanEmail = email.toLowerCase().trim();
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the password" });
    }

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exists",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    console.log("User logged in successfully:", token);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to log in" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Couldn't fetch the user datails" });
  }
};

module.exports = { login, register, getUser };
