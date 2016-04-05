exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tasks').del(),

    // Inserts seed entries
    knex('tasks').insert({user_id: 1, trip_id: 1, description: 'book camp site', due_date: '4/15/16'}),
    knex('tasks').insert({user_id: 2, trip_id: 1, description: 'get beer', due_date: '5/14/16' }),
    knex('tasks').insert({user_id: 3, trip_id: 2, description: 'book cabin', due_date: '6/1/16'}),
    knex('tasks').insert({user_id: 1, trip_id: 2, description: 'make menu', due_date: '6/30/16'})
  );
};
