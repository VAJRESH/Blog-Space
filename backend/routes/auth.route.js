const express = require("express");
const router = express.Router();

// controllers
const {
  register,
  login,
  logout,
  requireLogin,
} = require("../controllers/auth.controller");

// validators
const {
  validateRegisterDetails,
  validateLoginDetails,
} = require("../validators/auth.validator");

// api routes;
router.post("/register", validateRegisterDetails, register);
router.post("/login", validateLoginDetails, login);
router.post("/logout", logout);

// login protected route
router.get("/secret", requireLogin, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
