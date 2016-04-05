exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip', function(table){
    table.increments();
    table.integer('details_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trip');
};
