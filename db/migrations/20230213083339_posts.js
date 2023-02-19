exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary().unique();
    table.string("title", [255]).notNullable();
    table.string("description", [255]).notNullable();
    table.string("body").notNullable();
    table.string("thumbnail", [255]).notNullable();
    table.bigint("user_id").unsigned().references("id").inTable("users");
    table.bigint("tag_id").unsigned().references("id").inTable("tags");
    table.timestamps(true, true);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
