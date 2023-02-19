/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex("tags").del()
  .then(() => {
    return knex('tags').insert([
      {
        id: 1,
        name: "design",
      },
    ]);
  })
};