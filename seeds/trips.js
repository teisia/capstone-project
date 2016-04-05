exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('trip').del(),

    // Inserts seed entries
    knex('trip').insert({details_id: 1}),
    knex('trip').insert({details_id: 2})
  );
};
