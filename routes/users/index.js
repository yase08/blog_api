const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController");
const auth = require("../../middlewares/auth");
const path = require("path");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/avatar"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer();

router.get("/:username", auth, userController.getUserProfile);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put(
  "/:id",
  auth,
  multer({ storage: diskStorage }).single("avatar"),
  userController.updateUser
);

module.exports = router;
