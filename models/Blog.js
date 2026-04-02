const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    coverImage: { type: String },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    author: { type: String, default: "Lexxusmoon" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  if (this.isModified("content") && !this.excerpt) {
    this.excerpt = this.content.replace(/<[^>]*>/g, "").substring(0, 200);
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
