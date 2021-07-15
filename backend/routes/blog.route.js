const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images/");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-")
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// validators
const { validateNewBlog } = require("../validators/blog.validator");

// controllers
const { requireLogin, isAdmin } = require("../controllers/auth.controller");
const {
  createNewBlogPost,
  updateBlogPost,
  getSingleBlog,
  getAllBlogs,
} = require("../controllers/blog.controller");

// api routes;
router.post(
  "/create",
  upload.single("photo"),
  requireLogin,
  validateNewBlog,
  isAdmin,
  createNewBlogPost
);
router.put(
  "/update/:slug",
  upload.single("photo"),
  requireLogin,
  validateNewBlog,
  isAdmin,
  updateBlogPost
);
router.get("/list", getAllBlogs);
// router.get("/list/:slug", getSingleBlog);
// router.delete("/list/:slug", requireLogin, isAdmin, deleteCategory);

module.exports = router;
