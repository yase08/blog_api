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
    const { slug } = req.params;

    const post = await knex.raw("SELECT public.f_posts_select(?) as post", [
      slug,
    ]);
    const postExists = post.rows[0].post;

    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(postExists);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, slug, body, user_id, tag_id } = req.body;

    // Validate thumbnail
    const thumbnail = req.file ? `thumbnail/${req.file.filename}` : null;
    if (!thumbnail) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    // Validate tag_id
    const tagExists = await knex.raw("SELECT * FROM f_tags_select_by_id(?)", [
      tag_id,
    ]);
    if (tagExists.rows.length === 0) {
      return res.status(400).json({ message: "Invalid tag id" });
    }

    // Call f_posts_insert function
    const result = await knex.raw(
      "SELECT * FROM f_posts_insert(?, ?, ?, ?, ?, ?, ?)",
      [title, description, slug, body, thumbnail, user_id, tag_id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, description, body, tag_id } = req.body;
    const thumbnail = req.file ? `thumbnail/${req.file.filename}` : null;
    // Cek apakah post dengan slug tersebut ada
    const postExists = await knex.raw(
      "SELECT public.f_posts_select(?) as post",
      [slug]
    );
    const post = postExists.rows[0].post;
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update post dengan function
    const result = await knex.raw(
      "SELECT public.f_posts_update(?, ?, ?, ?, ?, ?, ?)",
      [post.id, title, description, slug, body, thumbnail, tag_id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const removePost = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if post exists
    const postExists = await knex.raw(
      "SELECT public.f_posts_select(?) as post",
      [slug]
    );
    const post = postExists.rows[0].post;
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Call f_posts_delete function
    const result = await knex.raw("SELECT public.f_posts_delete(?)", [post.id]);

    return res.json({ message: result.rows[0] });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { comment, user_id } = req.body;

    // Insert comment into database
    const result = await knex.raw(
      "SELECT public.f_comments_insert(?, (SELECT id FROM public.posts WHERE slug = ?), ?) as message",
      [comment, slug, user_id]
    );

    const message = result.rows[0].message;

    res.status(201).json({ message });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { slug, id } = req.params;

    const result = await knex.raw(
      "SELECT public.f_comments_delete(?, ?) as message",
      [slug, id]
    );

    res.json({ message: result.rows[0].message });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
