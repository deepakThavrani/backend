const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const { uploadImage, deleteImage } = require("../controllers/uploadController");

router.post("/", auth, upload.single("image"), uploadImage);
router.delete("/", auth, deleteImage);

module.exports = router;
