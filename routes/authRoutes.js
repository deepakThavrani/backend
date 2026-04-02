const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { login, verify, seed } = require("../controllers/authController");

router.post("/login", login);
router.get("/verify", auth, verify);
router.post("/seed", seed);

module.exports = router;
