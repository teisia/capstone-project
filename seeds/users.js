
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user_list').del(),

    // Inserts seed entries
    knex('user_list').insert({first_name: 'beyonce', last_name: 'knowles'}),
    knex('user_list').insert({first_name: 'michael', last_name: 'scott'})
  );
};
