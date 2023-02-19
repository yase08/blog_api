/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex("users").del()
  .then(() => {
    return knex('users').insert([
      {
        id: 1,
        username: "user",
        password: "123",
        email: "user@gmail.com",
        avatar: "image.png",
      },
    ]);
  })
};