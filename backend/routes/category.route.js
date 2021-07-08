const express = require("express");
const router = express.Router();

// controllers
const { requireLogin, isAdmin } = require("../controllers/auth.controller");
const {
  createNewCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// validators
const {
  categoryAndTagValidator,
} = require("../validators/categoryAndTag.validator");

// api routes;
router.post(
  "/create",
  categoryAndTagValidator,
  requireLogin,
  isAdmin,
  createNewCategory
);
router.get("/list", getAllCategories);
router.get("/list/:slug", getSingleCategory);
router.delete("/list/:slug", requireLogin, isAdmin, deleteCategory);

module.exports = router;
