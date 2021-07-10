const Blog = require("../models/blogs.model");
const Category = require("../../archives/category.model");
const Tags = require("../models/tag.model");
// const formidable = require("formidable");
// const slugify = require("slugify");
// const { stripHtml } = require("string-strip-html");
// const _ = require("lodash");
// const { errorHandler } = require("../helpers/dbErrorHandler");
// const { smartTrim } = require("../helpers/blog");
// const fs = require("fs");

exports.createNewBlogPost = (req, res) => {
    const { body } = req;
    
    res.json(body)
};