exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_list', function(table){
    table.increments();
    table.string('google_id');
    table.string('picture');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_list');
};
