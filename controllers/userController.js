const asynHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a user
//@route Post a user
//@ access public

const registerUser = asynHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
  }
  const userAviable = await User.findOne({ email });
  if (userAviable) {
    res.status(400);
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hash", hashedPassword);
  // To create a user in data base
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(user);
  res.json({ message: "Registered the user" });
});

//@desc login a user
//@route Post
//@ access public
const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
  }
  const user = await User.findOne({ email });
  //comapare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({
      accessToken,
    });
  }
  res.json({ message: "Login user" });
});

//@desc current user
//@route Get
//@ access private
const currentUser = asynHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
