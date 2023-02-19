const express = require("express");
const router = express.Router();
const postController = require("../../controllers/PostController");
const auth = require("../../middlewares/auth");
const path = require("path");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.get("/article", postController.getAllPosts);
router.get("/singlepost/:slug", postController.singlePost);
router.post("/createpost", multer({ storage: diskStorage }).single("thumbnail"), postController.createPost);
router.post("/createComment/:post_id", auth, postController.createComment);
router.put("/update/:slug", auth, postController.updatePost);
router.delete("/comment/:id", auth, postController.removeComment);
router.delete("/:slug", auth, postController.removePost);

module.exports = router;