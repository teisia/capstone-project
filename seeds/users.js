
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('userList').del(),

    // Inserts seed entries
    knex('userList').insert({first_name: 'beyonce', last_name: 'knowles'}),
    knex('userList').insert({first_name: 'michael', last_name: 'scott'})
  );
};
