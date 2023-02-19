const jwt = require('jsonwebtoken');
const secret = "SECRET";
const bcrypt = require('bcryptjs');
const knex = require('../db/knex');

const register = async (req, res) => {
  try {
    const {
      email,
      username,
      password
    } = req.body

    const getUser = async (email) => {
      return await knex.select().from('users').where('email', email).then((user) => {
          return user[0];
        });
    };

    let emailExists = await getUser(email);

    if (!emailExists) {
      let newUser = {
        username,
        email,
        password
      };

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(password, salt);

      await knex("users").insert(newUser);

      res.send({
        msg: "User Registered Successfully!",
      });
    } else {
      res.send({
        msg: "Email Already Exists",
      });
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "POST")
      return res.status(400).json({ msg: "Login Denied!" });

    const { 
      email, 
      password 
    } = req.body;

    let user = await knex.select().from('users').where('email', email).then((user) => { return user[0] })

    if (!user) return res.status(400).json({ msg: "Email Not Found!" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Invalid Credentials!" });

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload, secret,
      {
        expiresIn: '2d',
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "Login Success",
          users: {
            token,
            username: user.username,
            email: user.email
          }
        });
      }
    );
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await knex
      .select()
      .from("users")
      .where("id", req.user.id)
      .then((user) => {
        return user[0];
      });

    if (user.id === req.user.id) {
      res.send(user);
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    const user = {};
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (avatar) {
      const { filename, mimetype } = req.file;
      const filepath = req.file.path;
      const avatar = filename + filepath + "." + mimetype;
      user.avatar = avatar;
    }
    await knex.select().from("users").where("id", req.params.id).update(user);
    res.json({
      msg: "Update Success!",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  getUserProfile,
};
