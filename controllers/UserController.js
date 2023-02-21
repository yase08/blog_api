const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const knex = require("../db/knex");

const register = async (req, res) => {
  const { username, password, email, confirmPassword } = req.body;

  // Validate password and confirm password
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password do not match" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the f_users_insert function using Knex
    const result = await knex.raw(
      "SELECT public.f_users_insert(?, ?, ?) as message",
      [username, hashedPassword, email]
    );

    // Check the result for the success message
    if (result.rows[0].message === "User successfully created!") {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      throw new Error("Error creating user");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get the user data from the database based on the email
    const result = await knex.raw(
      "SELECT * FROM public.f_users_select((SELECT id FROM public.users WHERE email = ?))",
      [email]
    );

    // Check if the query returned any rows
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Get the user data from the first row of the result set
    const user = result.rows[0];

    // Check if the password is correct using bcrypt
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the user
    const payload = { userId: user.id };
    const secret = process.env.JWT_SECRET;

    jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res.json({
        message: "Login success",
        user: {
          token,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    // Get the user profile data from the database based on the username
    const result = await knex.raw(
      "SELECT * FROM public.users WHERE username = ?",
      [username]
    );

    // Check if the query returned any rows
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Get the user profile data from the first row of the result set
    const user = await knex
      .raw("SELECT * FROM public.f_users_select(?)", [result.rows[0].id])
      .then((result) => result.rows[0]);

    res.send(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const avatar = req.file
      ? `avatar/${req.file.filename}`
      : null;

    // Validasi input
    if (!username && !email && !password && !avatar) {
      return res.status(400).json({ message: "No changes detected" });
    }

    const user = {
      id: req.params.id,
      username,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
      avatar,
    };

    if (avatar) {
      const updatedUser = await knex
        .raw("SELECT * FROM f_users_update(?, ?, ?, ?, ?)", [
          user.id,
          user.username,
          user.password,
          user.email,
          user.avatar,
        ])
        .then((result) => result.rows[0]);

      res.json({ message: "User updated successfully", user: updatedUser });
    } else {
      const updatedUser = await knex
        .raw("SELECT * FROM f_users_update(?, ?, ?, ?)", [
          user.id,
          user.username,
          user.password,
          user.email,
        ])
        .then((result) => result.rows[0]);

      res.json({ message: "User updated successfully", user: updatedUser });
    }
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
