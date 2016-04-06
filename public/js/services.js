app.factory("TripService", function($http){

return {
  getTrips: function() {
    return $http.get("/trips");
  },

  getTrip: function(trip_id) {
    return $http.get("/trips/"+trip_id);
    }
  }

});
