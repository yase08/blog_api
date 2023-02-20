const knex = require("../db/knex");

// const getPopularPost = async (req, res) => {
//   try {
//     const posts = await knex
//       .select()
//       .from("posts")
//       .then((posts) => {
//         return posts;
//       });
//     res.send(posts);
//   } catch (error) {
//     res.json({
//       msg: error.message,
//     });
//   }
// };

const getAllPosts = async (req, res) => {
  try {
    const posts = await knex("posts");
    res.send(posts);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const singlePost = async (req, res) => {
  try {
    const query = await knex.raw("SELECT * FROM public.f_get_post(?)", [
      req.params.slug,
    ]);
    const post = query.rows[0];
    if (post.length) {
      res.send(post);
    } else {
      res.status(404).json({
        msg: "Post not found",
      });
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, body, tag_id, slug } = req.body;
    const user_id = 1;
    // const user_id = req.user.id;
    const thumbnail = req.file ? req.file.filename : null;
    const post = await knex.raw(
      "SELECT public.f_create_post(?, ?, ?, ?, ?, ?, ?)",
      [title, description, body, tag_id, thumbnail, user_id, slug]
    );
    res.json({
      msg: "Post Successfully Created!",
      id: post.rows[0].f_create_post,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// giblog
const updatePost = async (req, res) => {
  try {
    const query = await knex.raw("SELECT * FROM public.f_get_post(?)", [
      req.params.slug,
    ]);
    const post = query.rows[0];
    if (!post.length) {
      res.status(400).json({
        msg: "Post Not Found!",
      });
    } else {
      const { title, description, body, tag_id, thumbnail } = req.body;
      const slug = req.params.slug;
      await knex.raw("SELECT f_update_post(?, ?, ?, ?, ?, ?, ?)", [
        post.id,
        title,
        description,
        body,
        tag_id,
        thumbnail,
        slug,
      ]);
      res.json({
        msg: "Post Successfully Updated!",
      });
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const removePost = async (req, res) => {
  try {
    const query = await knex.raw("SELECT * FROM public.f_get_post(?)", [
      req.params.slug,
    ]);
    const post = query.rows[0];
    if (!post.length) {
      res.status(400).json({
        msg: "Post Not Found!",
      });
    } else {
      await knex.raw("SELECT f_delete_post(?)", [post.id]);
      res.json({
        msg: "Post Successfully Deleted!",
      });
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { comment, user_id } = req.body;
    await knex.raw("SELECT f_create_comment(?, ?, ?)", [
      comment,
      (post_id = req.params.post_id),
      user_id,
    ]);
    res.json({
      msg: "Create Success!",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const removeComment = async (req, res) => {
  try {
    const comment = await knex
      .select()
      .from("comments")
      .where("id", req.params.comment_id)
      .where("user_id", req.user.id)
      .then((comment) => {
        return comment[0];
      });
    if (!comment) {
      res.status(400).json({
        msg: "Comment Not Found or Not Authorized!",
      });
    } else {
      await knex.raw("SELECT f_delete_comment(?)", [comment.id]);
      res.json({
        msg: "Comment Successfully Deleted!",
      });
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

module.exports = {
  // getPopularPost,
  getAllPosts,
  singlePost,
  updatePost,
  removePost,
  removeComment,
  createPost,
  createComment,
};
