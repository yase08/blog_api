const knex = require("../db/knex");

const getAllTags = async (req, res) => {
  try {
    const tags = await knex("tags");
    res.send(tags);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

// Create a new tag
const createTag = async (req, res) => {
  const { name } = req.body;
  const query = await knex.raw("SELECT public.f_create_tag(?)", [name]);
  const tagId = query.rows[0].f_create_tag;
  res.json({ msg: "Tag Successfully Created!", id: tagId });
};

// Delete a tag
const deleteTag = async (req, res) => {
  const { id } = req.params;
  await knex.raw("SELECT public.f_delete_tag(?)", [id]);
  res.json({ message: "Tag deleted successfully" });
};

module.exports = { getAllTags, createTag, deleteTag };
