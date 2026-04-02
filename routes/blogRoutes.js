const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAll,
  getAllAdmin,
  getBySlug,
  getByCategory,
  create,
  update,
  remove,
  addView,
  addLike,
} = require("../controllers/blogController");

router.get("/", getAll);
router.get("/admin/all", auth, getAllAdmin);
router.get("/slug/:slug", getBySlug);
router.get("/category/:category", getByCategory);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, remove);
router.put("/:id/view", addView);
router.put("/:id/like", addLike);

module.exports = router;
