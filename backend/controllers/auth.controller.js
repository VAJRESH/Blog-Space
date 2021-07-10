const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.isUsernameTaken = (req, res) => {
  const username = req.params.username.toLowerCase();

  User.find({ username }).exec((findError, user) => {
    if (findError) return res.status(400).json({ error: findError });
    if (user.length !== 0) return res.status(400).send(true);

    res.send(false);
  });
};

exports.register = (req, res) => {
  let { name, username, email, password } = req.body;
  username = username.toLowerCase().split(" ").join("-");

  User.find({ $or: [{ username: username }, { email: email }] }).exec(
    (findError, user) => {
      if (findError) return res.status(400).json({ error: findError });

      if (user.length !== 0) {
        if (user[0].username === username)
          return res.status(400).json({ error: "Username is taken" });
        if (user[0].email === email)
          return res.status(400).json({ error: "Email is taken" });
      }

      // unique id generation for SEO user
      const profile = `${process.env.CLIENT_URL}/profile/${username}`;

      const newUser = new User({ name, email, password, profile, username });
      newUser.save((saveError, success) => {
        if (saveError) return res.status(400).json({ error: saveError });

        res.json({ message: `New User, ${name} is registered. Please login.` });
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((findError, user) => {
    if (findError) return res.status(400).json({ error: findError });
    if (!user)
      return res.status(400).json({ error: `Email is not registered email.` });

    if (!user.isPasswordCorrect(password))
      return res
        .status(400)
        .json({ error: `Email and password does not match!!` });

    // generate token and send it to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    res.cookie("token", token, { expiresIn: "365d" });

    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
      message: "Login Success",
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "You are Logged Out!!" });
};

exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.isAdmin = (req, res, next) => {
  const adminId = req.user._id;

  User.findById(adminId).exec((findError, user) => {
    if (findError) return res.status(400).json({ error: findError });
    if (!user) return res.status(400).json({ error: `User not found.` });
    if (user.role !== 1)
      return res.status(400).json({ error: "Only Admins can access!!" });

    req.profile = user;
    next();
  });
};
