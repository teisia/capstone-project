exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip_user', function(table){
    table.increments();
    table.integer('trip_id');
    table.integer('user_id');
    table.boolean('is_admin');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trip_user');
};
