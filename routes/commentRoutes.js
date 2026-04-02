const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addComment,
  getByBlog,
  getAll,
  approve,
  remove,
} = require("../controllers/commentController");

// Public
router.post("/blog/:blogId", addComment);
router.get("/blog/:blogId", getByBlog);

// Admin
router.get("/admin/all", auth, getAll);
router.put("/:id/approve", auth, approve);
router.delete("/:id", auth, remove);

module.exports = router;
