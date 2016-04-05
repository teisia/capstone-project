exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user').del(),

    // Inserts seed entries
    knex('user').insert({first_name: 'teisia', last_name: 'park', email: 'teisia@gmail.com', password: 'password'}),
    knex('user').insert({first_name: 'taylor', last_name: 'smith', email: 'test@test.com', password: 'password2'}),
    knex('user').insert({first_name: 'kanye', last_name: 'west', email: 'test2@test.com', password: 'password3'})
  );
};
