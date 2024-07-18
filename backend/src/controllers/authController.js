const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { sendCookie, createToken, routeErrors } = require("../utils/helpers");
const { USERS } = require("../utils/constants");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name, userType: foundUser.userType },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30d",
        }
      );

      //dont send password
      const { password, ...others } = foundUser._doc;
      sendCookie(res, token);
      res.send({ ...others });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentails" });
  }
};


const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { name, email, password } = req.body;
    if (name.length && email.length && password.length) {
      const person = new User({
        name: name,
        email: email,
        password: password,
      });
      await person.save();
      const user = await User.findById(person._id).select('-password');
      const token = jwt.sign(
        { id: user._id, name: user.name, userType: user.userType },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30d"
        }
      );

      sendCookie(res, token);
      return res.status(201).json({user});

    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { TAST } = req.cookies;

    if (!TAST) return res.status(401).send("Session expired!");

    jwt.verify(TAST, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) return res.status(402).send("Access Denied!");

      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(402).send("Access Denied!");
      const { password, ...others } = user._doc;
      res.send({ ...others });
    });
  } catch (error) {
    console.error("User authentication failed:", error);
    res.status(500).send("User authentication failed!");
  }
};


const logout = async (req, res) => {
  // clear the cookies
  // sendCookie(res, "", 1);
  res.clearCookie('TAST');
  return res.send("Logged out.");
};

module.exports = {
  login,
  register,
  logout,
  authenticateUser
};
