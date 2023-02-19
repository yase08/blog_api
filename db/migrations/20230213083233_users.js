exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary().unique();
    table.string("username", [50]).notNullable();
    table.string("password", [255]).notNullable();
    table.string("email", [255]).notNullable().unique();
    table.string("avatar", [255]);
    table.timestamps(true, true);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
