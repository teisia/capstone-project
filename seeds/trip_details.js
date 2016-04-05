exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('trip_details').del(),

    // Inserts seed entries
    knex('trip_details').insert({title: 'moab', description: 'car camping in moab', trip_start: '5/15/16', trip_end: '5/18/16'}),
    knex('trip_details').insert({title: 'wyoming', description: 'cabin in wyoming', trip_start: '7/21/16', trip_end: '7/26/16'})
  );
};
