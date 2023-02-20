const express = require("express");
const router = express.Router();
// const postController = require("../controllers/PostController");

// router.get("/", postController.getPopularPost);
router.use("/user", require("./users/index"));
router.use("/post", require("./posts/index"));
router.use("/tag", require("./tags/index"));

module.exports = router;
