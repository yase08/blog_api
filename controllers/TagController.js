const knex = require("../db/knex");

const getAllTags = async (req, res) => {
  try {
    const { rows: tags } = await knex.raw("SELECT * FROM f_tags_select_all()");
    res.json({ tags });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await knex.raw("SELECT public.f_tags_insert(?)", [name]);
    const message = result.rows[0].f_tags_insert;

    return res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Delete a tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTag = await knex
      .raw("SELECT * FROM f_tags_delete(?)", [id])
      .then((result) => result.rows[0]);

    res.json({ message: "Tag deleted successfully", tag: deletedTag });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllTags, createTag, deleteTag };
