const Comment = require("../models/Comment");

// Public: add comment to a blog
exports.addComment = async (req, res) => {
  try {
    const { name, email, content } = req.body;
    if (!name || !email || !content) {
      return res.status(400).json({ message: "Name, email, and content are required" });
    }

    const comment = await Comment.create({
      blog: req.params.blogId,
      name,
      email,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Public: get approved comments for a blog
exports.getByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all comments (with blog title)
exports.getAll = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blog", "title slug")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: approve a comment
exports.approve = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: delete a comment
exports.remove = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
