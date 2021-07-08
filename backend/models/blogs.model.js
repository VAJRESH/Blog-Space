const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, max: 32, min: 3 },
    slug: { type: String, unique: true, index: true },
    body: { type: {}, required: true, min: 200, max: 2000000 },
    excerpt: { type: String, max: 1000 },
    photo: { type: Buffer, contentType: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true }],
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
