const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "static/uploads/" });
const { uploadFile, processData } = require("../controllers/data");
router.post("/upload", upload.single("file"), uploadFile);

router.get("/process", processData);

module.exports = router;
