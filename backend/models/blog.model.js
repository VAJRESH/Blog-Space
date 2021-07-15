const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, max: 32, min: 3 },
    slug: { type: String, unique: true, index: true },
    body: { type: {}, required: true, min: 200, max: 2000000 },
    photo: { data: Buffer, contentType: String },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
