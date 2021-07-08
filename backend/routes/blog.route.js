const express = require("express");
const router = express.Router();

// controllers
const { requireLogin, isAdmin } = require("../controllers/auth.controller");
const { createNewBlogPost } = require("../controllers/blog.controller");

// api routes;
router.post("/create", requireLogin, isAdmin, createNewBlogPost);
// router.get("/list", getAllCategories);
// router.get("/list/:slug", getSingleCategory);
// router.delete("/list/:slug", requireLogin, isAdmin, deleteCategory);

module.exports = router;
