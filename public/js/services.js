app.factory("UserService", function($http) {
  return {
    getUsers: function() {
      return $http.get("/users");
    }
  }
})

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

app.factory("TaskService", function($http){

return {
  getTasks: function(trip_id) {
    return $http.get("/trips/"+trip_id+"/tasks");
  },

  newTask: function(trip_id, task_object) {
    return $http.post("/trips/"+trip_id+"/tasks", task_object);
  },

  editTask: function(trip_id, task) {
    return $http.post("/trips/"+trip_id+"/tasks/"+task.id+"/edit", task);
  },

  deleteTask: function(trip_id, task_id) {
    return $http.post("/trips/"+trip_id+"/tasks/"+task_id+"/delete");
  }
}

});

app.factory("MessageService", function($http){

return {
  getMessages: function(trip_id) {
    return $http.get("/trips/"+trip_id+"/messages");
  },

  newMessage: function(trip_id, message_object) {
    return $http.post("/trips/"+trip_id+"/messages", message_object);
  }
}

});
