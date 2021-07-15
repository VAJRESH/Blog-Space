const Blog = require("../models/blog.model");
const Tags = require("../models/tag.model");
const { slugify, handleResponse } = require("../helper/controller.helper");
const fs = require("fs");
const path = require("path");

exports.createNewBlogPost = async (req, res) => {
  const { title, body, tags } = req.body;
  const authorId = req.user._id;

  console.log(req.body, req.file);

  let newBlog = new Blog({ title, body });
  newBlog.slug = slugify(title);
  newBlog.author = authorId;

  if (req.file) {
    if (req.file.size > 10000000) {
      return res
        .status(400)
        .json({ error: "Image should be less than 1mb in size" });
    }
    // save to database
    newBlog.photo = {
      data: fs.readFileSync(
        path.join(__dirname, "../images/", req.file.filename)
      ),
      contentType: req.file.mimetype,
    };

    // delete file which is saved locally
    await fs.unlink(req.file.path, (err) => {
      if (err) return console.error(err);
    });
  }

  newBlog.tags = tags.split(",");
  if (newBlog.tags.length < 1)
    return res.status(422).json({ error: "At least 1 tag is required" });

  newBlog.save((saveError, data) => {
    handleResponse(saveError, res, data);
  });
};

exports.getAllBlogs = (req, res) => {
  Blog.find({}).exec((err, blogs) => {
    return handleResponse(err, res, blogs);
  });
};

exports.updateBlogPost = (req, res) => {
  const { title, body, tags } = req.body;
  const slug = req.params.slug.toLowerCase();
  const authorId = req.user._id;

  Blog.find({ slug }).exec((err, blogs) => {
    return handleResponse(err, res, blogs);
  });
};

exports.getSingleBlogs = (req, res) => {
  Blog.find({}).exec((err, blogs) => {
    return handleResponse(err, res, blogs);
  });
};
