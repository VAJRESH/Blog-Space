const express = require("express");
const router = express.Router();

// controllers
const { requireLogin, isAdmin } = require("../controllers/auth.controller");
const {
  createNewTag,
  getAllTags,
  getSingleTag,
  deleteTag,
} = require("../controllers/tag.controller");

// validators
const { categoryAndTagValidator } = require("../validators/categoryAndTag.validator");

// api routes;
router.post(
  "/create",
  categoryAndTagValidator,
  requireLogin,
  isAdmin,
  createNewTag
);
router.get("/list", getAllTags);
router.get("/list/:slug", getSingleTag);
router.delete("/list/:slug", requireLogin, isAdmin, deleteTag);

module.exports = router;
