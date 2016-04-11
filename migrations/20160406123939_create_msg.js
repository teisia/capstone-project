exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('trip_id');
    table.text('message');
    table.string('created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
