exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary().unique();
    table.string("comment");
    table.bigint('post_id').unsigned().references('id').inTable('posts');
    table.bigint('user_id').unsigned().references('id').inTable('users');
    table.timestamps(true, true); 
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
