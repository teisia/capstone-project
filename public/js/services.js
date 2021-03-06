app.factory("SignOutService", function($http) {
  return {
    signout: function() {
      return $http.get("/sign-out");
    }
  }
})

app.factory("UserService", function($http) {
  return {
    getUsers: function() {
      return $http.get("/users");
    },

    getUser: function(user_id) {
      return $http.get("/users/"+user_id);
    }

  }
})

app.factory("MemberService", function($http) {
  return {
    postMembers: function(trip_id, members_object) {
      console.log(members_object);
      return $http.post("/trips/"+trip_id+"/members", {user_id: members_object});
    },

    getMembers: function(trip_id) {
      return $http.get("/trips/"+trip_id+"/members");
    }
  }
})

app.factory("TripService", function($http){

return {
  getTrips: function() {
    return $http.get("/trips");
  },

  getTripsInvited: function() {
    return $http.get("/trips/invited");
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

app.factory("TripDService", function($http){

return {
  getTripDs: function(trip_id) {
    return $http.get("/trips/"+trip_id+"/tripD");
  },

  newTripD: function(trip_id, tripd_object) {
    return $http.post("/trips/"+trip_id+"/tripD", tripd_object);
  },

  editTripD: function(trip_id, tripd) {
    return $http.post("/trips/"+trip_id+"/tripD/"+tripd.id+"/edit", tripd);
  },

  deleteTripD: function(trip_id, tripd_id) {
    return $http.post("/trips/"+trip_id+"/tripD/"+tripd_id+"/delete");
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
  },

  editMessage: function(trip_id, message) {
    return $http.post("/trips/"+trip_id+"/messages/"+message.id+"/edit", message);
  },

  deleteMessage: function(trip_id, message_id) {
    return $http.post("/trips/"+trip_id+"/messages/"+message_id+"/delete");
  }
}

});
