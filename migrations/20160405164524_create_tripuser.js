exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip_user', function(table){
    table.integer('trip_id');
    table.integer('user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trip_user');
};
