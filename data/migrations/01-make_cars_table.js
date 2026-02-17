exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("cars",function(table) {
    table.increments("id").primary();
    table.string("vin",17).notNullable().unique();
    table.string("make",50).notNullable();
    table.string("model",50).notNullable();
    table.integer("mileage").notNullable();
    table.string("title",50).nullable();
    table.string("transmission",50).nullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
