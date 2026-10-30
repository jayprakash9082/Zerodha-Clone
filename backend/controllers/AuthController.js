const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

// Create a JWT that stores the user id and expires in 3 days
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });


const isProd = process.env.NODE_ENV === "production";


const setCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd, 
    sameSite: isProd ? "none" : "lax", 
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });


module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Saari fields bharo" });

    const exists = await UserModel.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already registered hai" });

    
    const hashed = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hashed });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email or password wrong" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Email or password wrong" });

    setCookie(res, createToken(user._id));
    res.json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.verify = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("name email");
    if (!user) return res.status(401).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
};