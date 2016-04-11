
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user').del(),

    // Inserts seed entries
    knex('user').insert({first_name: 'beyonce', last_name: 'knowles'}),
    knex('user').insert({first_name: 'michael', last_name: 'scott'})
  );
};
