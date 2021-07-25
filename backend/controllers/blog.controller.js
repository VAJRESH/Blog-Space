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

exports.updateBlogPost = (req, res) => {
  const { title, body, tags } = req.body;
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec(async (err, blog) => {
    if (err) return res.status(400).json({ error, err });

    blog.title = title || blog.title;
    blog.body = body || blog.body;

    if (req.file) {
      if (req.file.size > 10000000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 1mb in size" });
      }
      // save to database
      blog.photo = {
        data: fs.readFileSync(
          path.join(__dirname, "../images/", req.file.filename)
        ),
        contentType: req.file.mimetype,
      };

      // delete file which is saved locally
      await fs.unlink(req.file.path, (err) => {
        if (err) return console.error(err);
      });
    } else {
      blog.photo = {};
    }

    if (tags) blog.tags = tags.split(",");

    if (blog.tags.length < 1)
      return res.status(422).json({ error: "At least 1 tag is required" });

    blog.save((saveError, data) => {
      handleResponse(saveError, res, data);
    });
  });
};

exports.updateViewCount = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, blog) => {
    if (err) return res.status(400).json({ error: err });

    blog.views += 1;

    blog.save((saveError, data) => {
      handleResponse(saveError, res, { message: "View Count Updated" });
    });
  });
};
exports.updateLikesOfBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const userId = req.user._id;

  Blog.findOne({ slug }).exec((err, blog) => {
    if (err) return res.status(400).json({ error: err });

    console.log(blog);
    // res.json(blog)
    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter((id) => id === userId);
    } else {
      blog.likes.push(userId);
    }

    blog.save((saveError, data) => {
      handleResponse(saveError, res, data);
    });
  });
};

exports.getAllBlogs = (req, res) => {
  const skip = +req.query.skip || 0;
  const limit = +(req.query.limit || 10) + skip;

  Blog.find({})
    .populate("tags", "_id name")
    .populate("author", "name username photo profile")
    .select("-photo")
    .exec((err, blogs) => {
      const slicedBlogs = blogs.slice(skip, limit);
      return handleResponse(err, res, {
        blogs: slicedBlogs,
        total: blogs.length,
      });
    });
};

exports.getTagBlogs = (req, res) => {
  const tag = req.params.tag;

  Blog.find({ tags: { $in: tag } })
    .populate("tags", "_id name")
    .populate("author", "name username photo profile")
    .select("-photo")
    .select("-photo")
    // .skip()
    .limit(5)
    .exec((err, blogs) => {
      return handleResponse(err, res, blogs);
    });
};

exports.getImage = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec(async (err, blog) => {
    if (err) return res.status(400).json({ error, err });

    res.set("Content-Type", blog.photo.contentType);
    return res.send(blog.photo.data);
  });
};

exports.getSingleBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug })
    .populate("tags")
    .populate("author")
    .select("-photo")
    .exec(async (err, blog) => {
      if (err) return res.status(400).json({ error, err });

      return res.send(blog);
    });
};

exports.getUserBlogs = (req, res) => {
  const authorId = req.params.author;

  Blog.find({ author: authorId })
    .populate("tags", "_id name")
    .populate("author", "name username photo profile")
    .select("-photo")
    .limit(10)
    .exec((err, blogs) => {
      return handleResponse(err, res, blogs);
    });
};

exports.getSearchedBlogs = (req, res) => {
  const { search } = req.query;

  Blog.find(
    {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ],
    },
    (err, blogs) => {
      if (err) return res.status(400).json({ error: errorHandler(err) });

      res.json(blogs);
    }
  ).select("-photo -body");
};

exports.deleteBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOneAndRemove({ slug }).exec(async (err, blog) => {
    if (err) return res.status(400).json({ error, err });

    return res.json(blog);
  });
};
