exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('trip_id');
    table.string('description');
    table.string('due_date');
    table.boolean('completed');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
