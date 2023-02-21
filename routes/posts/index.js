const express = require("express");
const router = express.Router();
const postController = require("../../controllers/PostController");
const auth = require("../../middlewares/auth");
const path = require("path");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/thumbnail"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.get("/", postController.getAllPosts);
router.post(
  "/",
  auth,
  multer({ storage: diskStorage }).single("thumbnail"),
  postController.createPost
);
router.get("/:slug", postController.singlePost);
router.put(
  "/:slug",
  auth,
  multer({ storage: diskStorage }).single("thumbnail"),
  postController.updatePost
);
router.delete("/:slug", auth, postController.removePost);
router.post("/comment/:slug", auth, postController.createComment);
router.delete("/comment/:slug/:id", auth, postController.removeComment);

module.exports = router;
