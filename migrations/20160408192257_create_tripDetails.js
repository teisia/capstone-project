exports.up = function(knex, Promise) {
  return knex.schema.createTable('tripDetails', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('trip_id');
    table.text('detail');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tripDetails');
};
