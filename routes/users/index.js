const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController");
const multer = require("multer");
const path = require("path");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const auth = require("../../middlewares/auth")

router.get("/:username", auth, userController.getUserProfile);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put(
  "/update/:username", auth,
  multer({ storage: diskStorage }).single("avatar"),
  userController.updateUser
);

module.exports = router;