const express = require("express");
const router = express.Router();
const tagController = require("../../controllers/TagController");

router.get("/", tagController.getAllTags);
router.post("/", tagController.createTag);
router.delete("/:id", tagController.deleteTag);
// router.get("/:name", tagController.getAllPostsByTag);

module.exports = router;
