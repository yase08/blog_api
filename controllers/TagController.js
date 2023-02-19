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
}

// const getAllPostsByTag = async (req, res) => {
//   try {
    
//   } catch (error) {
    
//   }
// }

module.exports = getAllTags