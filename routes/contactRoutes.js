const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { submit, getAll, markRead, remove } = require("../controllers/contactController");

router.post("/", submit);
router.get("/", auth, getAll);
router.put("/:id/read", auth, markRead);
router.delete("/:id", auth, remove);

module.exports = router;
