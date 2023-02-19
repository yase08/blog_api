const knex = require("../db/knex");

const getPopularPost = async (req, res) => {
  try {
    const posts = await knex
      .select()
      .from("posts")
      .then((posts) => {
        return posts;
      });
    res.send(posts);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

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
    const post = await knex
      .select()
      .from("posts")
      .where("slug", req.params.slug)
      .then((post) => {
        return post[0];
      });
    if (post.slug === req.params.slug) {
      res.send(post);
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, body, tag_id, thumbnail, user_id, slug } = req.body;
    const post = {};
    if (title) post.title = title;
    if (description) post.description = description;
    if (body) post.body = body;
    if (slug) post.slug = slug;
    if (tag_id) post.tag_id = tag_id;
    if (user_id) post.user_id = 1;
    if (thumbnail) {
      const { filename, mimetype } = req.file;
      const filepath = req.file.path;
      const thumbnail = filename + filepath + "." + mimetype;
      post.thumbnail = thumbnail;
    } else {
      throw new Error(400, "Thumbnail is required!");
    }
    await knex("posts").insert(post);
    res.json({
      msg: "Create Success!",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, description, body, thumbnail, tag_id, user_id } = req.body;
    const post = {};
    if (title) post.title = title;
    if (description) post.description = description;
    if (body) post.body = body;
    if (tag_id) post.tag_id = tag_id;
    if (user_id) post.user_id = req.user.id;
    if (thumbnail) {
      const { filename, mimetype } = req.file;
      const filepath = req.file.path;
      const thumbnail = filename + filepath + "." + mimetype;
      post.thumbnail = thumbnail;
    } else {
      throw new Error(400, "Thumbnail is required!");
    }
    await knex
      .select()
      .from("posts")
      .where("slug", req.params.slug)
      .update(post);
    res.json({
      msg: "Update Success!",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const removePost = async (req, res) => {
  try {
    const post = await knex
      .select()
      .from("posts")
      .where("slug", req.params.slug)
      .then((post) => {
        return post[0];
      });
    if (!post) {
      res.status(400).json({
        msg: "Post Not Found!",
      });
    } else {
      await knex.del(post);
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
    const { comment, post_id, user_id } = req.body;
    const comments = {};
    if (comment) comments.comment = comment;
    if (post_id) comments.post_id = req.post.id;
    if (user_id) comments.user_id = req.user.id;
    await knex("comments").insert(comment);
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
      .where("id", req.post.post_id)
      .where("id", req.user.user_id)
      .then((comment) => {
        return comment[0];
      });
    if (!comment) {
      res.status(400).json({
        msg: "Comment Not Found!",
      });
    } else {
      await knex.del(comment);
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
  getPopularPost,
  getAllPosts,
  singlePost,
  updatePost,
  removePost,
  removeComment,
  createPost,
  createComment,
};
