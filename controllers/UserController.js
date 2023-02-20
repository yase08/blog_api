const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex");

const secret = "SECRET";

const getEmail = async (email) => {
  const user = await knex.raw("SELECT * FROM f_get_email(?)", [email]);
  return user.rows[0]; // mengambil data dari rows[0]
};

const register = async (req, res) => {
  const { email, username, password } = req.body;

  const emailExists = await getEmail(email);

  if (emailExists[0]) {
    return res.json({ msg: "Email Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await knex("users").insert({
    username,
    email,
    password: hashedPassword,
  });

  res.json({ msg: "User Registered Successfully!" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await getEmail(email);

  if (!user) {
    return res.status(400).json({ msg: "Email Not Found!" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ msg: "Wrong Password!" });
  }

  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  };

  jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
    if (err) throw err;
    res.json({
      message: "Login Success",
      user: {
        token,
        username: user.username,
        email: user.email,
      },
    });
  });
};

const getUserProfile = async (req, res) => {
  const user = await knex
    .raw("SELECT * FROM f_get_user(?)", [req.params.username])
    .then((result) => result.rows[0]);

  res.send(user);
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    // Validasi input
    if (!username && !email && !password && !avatar) {
      return res.status(400).json({ message: "No changes detected" });
    }

    const user = {
      id: req.params.id, // menggunakan id daripada username
      username,
      email,
      password:
        password && (await bcrypt.hash(password, await bcrypt.genSalt(10))),
      avatar: avatar && `${req.file.filename}.${req.file.mimetype}`,
    };

    await knex.raw("SELECT public.f_update_user(?)", [JSON.stringify(user)]);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  getUserProfile,
};
