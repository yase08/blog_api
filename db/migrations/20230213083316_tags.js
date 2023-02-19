exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.increments("id").primary().unique();
    table.string("name", [255]).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tags");
};
