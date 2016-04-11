exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip_details', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('trip_id');
    table.text('detail');
    table.string('url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trip_details');
};
