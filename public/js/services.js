app.factory("TripService", function($http){

return {
  getTrips: function() {
    return $http.get("/trips");
  },

  getTrip: function(trip_id) {
    return $http.get("/trips/"+trip_id);
  },
  newTrip: function(trip_object) {
    return $http.post("/trips", trip_object);
  },

  editTrip: function(trip_id) {
    return $http.get("/trips/"+trip_id);
  },

  deleteTrip: function(trip_id) {
    return $http.post("/trips/"+trip_id);
  }
  }

});
