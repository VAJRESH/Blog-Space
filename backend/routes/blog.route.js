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
const { validateBlogDetails } = require("../validators/blog.validator");

// controllers
const { requireLogin, isAdmin } = require("../controllers/auth.controller");
const {
  createNewBlogPost,
  updateBlogPost,
  updateLikesOfBlog,
  updateViewCount,
  getUserBlogs,
  getAllBlogs,
  getSingleBlog,
  getImage,
  getSearchedBlogs,
  getTagBlogs,
  deleteBlog,
} = require("../controllers/blog.controller");

// api routes;
router.post(
  "/create",
  upload.single("photo"),
  requireLogin,
  validateBlogDetails,
  isAdmin,
  createNewBlogPost
);
router.put(
  "/update/:slug",
  upload.single("photo"),
  requireLogin,
  validateBlogDetails,
  isAdmin,
  updateBlogPost
);
router.put("/updateLike/:slug", upload.none(), requireLogin, updateLikesOfBlog);
router.put("/updateView/:slug", upload.none(), updateViewCount);
router.get("/image/:slug", getImage);
router.get("/list", getAllBlogs);
router.get("/list/:author", getUserBlogs);
router.get("/filter/:tag", getTagBlogs);
router.get("/search", getSearchedBlogs);
router.delete("/delete/:slug", requireLogin, isAdmin, deleteBlog);
router.get("/single/:slug", getSingleBlog);

module.exports = router;
