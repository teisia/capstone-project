app.controller('LoginCtrl', function($scope, $auth, $location) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(response) {
        console.log('You have successfully signed in with ' + provider + '!');
        $location.path('/dashboard')
      })
      .catch(function(error) {
        if (error.error) {
          // Popup error - invalid redirect_uri, pressed cancel button, etc.
          console.log(error.error);
        } else if (error.data) {
          // HTTP response error from server
        console.log(error.data.message, error.status);
        } else {
          console.log(error);
        }
      });
  };

});

app.controller('LogOutCtrl', function($scope, $auth, SignOutService) {
  $scope.logOut = function() {
  SignOutService.signout = function() {
  $location.path('/')
  }
  }
});

app.controller('MainController', ['$scope', '$http', '$routeParams', '$location', '$route', '$window', 'TripService', 'UserService', function($scope, $http, $routeParams, $location, $route, $window, TripService, UserService){

     $scope.toggleNewTripForm = function() {
       $scope.showme = !$scope.showme;
     }

    TripService.getTrips().then(function(payload){
     $scope.trip_collection = payload.data.payload;
    }, function(error){
      console.log("an error occurred");
    });

    TripService.getTripsInvited().then(function(payload){
     $scope.invited_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    });

    $scope.trip = {};
    $scope.postTrip = function() {
    TripService.newTrip($scope.trip).then(function(result) {
      $route.reload();
      console.log("posted trip");
    })
    }

    UserService.getUsers().then(function(payload) {
      $scope.user_collection = payload.data.payload;
    }, function(error){
      console.log("an error occurred");
    })

}])

app.controller('SingleTripController', ['$scope', '$http', '$routeParams', '$location', '$route', '$window', 'TripService', 'UserService', 'TaskService', 'MessageService', 'TripDService', 'MemberService', function($scope, $http, $routeParams, $location, $route, $window, TripService, UserService, TaskService, MessageService, TripDService, MemberService){

    $scope.toggleAddMembersForm = function () {
      $scope.showmeAM = !$scope.showmeAM;
    }

    $scope.toggleEditTripForm = function () {
      $scope.showmeET = !$scope.showmeET;
    }

    $scope.toggleNewTaskForm = function () {
      $scope.showmeNT = !$scope.showmeNT;
    }

    $scope.toggleEditTaskForm = function () {
      this.showmeETask = !this.showmeETask;
    }

    $scope.toggleNewMessage = function () {
      $scope.showmeNM = !$scope.showmeNM;
    }

    $scope.toggleEditMsgForm = function () {
      this.showmeEM = !this.showmeEM;
    }

    $scope.toggleNewTripDForm = function () {
      $scope.showmeNTD = !$scope.showmeNTD;
    }

    $scope.toggleEditTripDForm = function () {
      this.showmeETD = !this.showmeETD;
    }

    var the_id = $routeParams.id;

    TripService.getTrip(the_id).then(function(payload){
      $scope.singleTrip = payload.data.payload[0];
      $scope.admin_id = $scope.singleTrip.admin_id;
      UserService.getUser($scope.admin_id).then(function(payload2) {
        $scope.organizer = payload2.data[0].first_name + ' ' + payload2.data[0].last_name;
      })
    }, function(error){
      console.log("an error occurred");
    });

    TripService.editTrip(the_id).then(function(payload) {
      $scope.tripInfo = payload.data.payload[0];
    })

    TripService.deleteTrip(the_id).then(function(payload) {
      console.log("you deleted it");
    })

    UserService.getUsers().then(function(payload) {
      $scope.user_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    })

    TaskService.getTasks(the_id).then(function(payload){
     $scope.task_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    })

    $scope.checkTask = function(task) {
      TaskService.editTask(the_id, task).then(function(payload) {
        $scope.task_collection = payload.data;
      })
    }

    $scope.task = {};
    $scope.postTask = function() {
    TaskService.newTask(the_id, $scope.task).then(function() {
      $route.reload();
      console.log("posted task");
    })
    }

    $scope.editTask = function (task) {
      TaskService.editTask(the_id, task).then(function(payload) {
        console.log("you edited it");
        $scope.task_collection = payload.data;
      })
      }

    $scope.deleteTask = function (taskId) {
      TaskService.deleteTask(the_id, taskId).then(function(payload) {
        console.log("you deleted it");
        $scope.task_collection = payload.data;
      })
      }

      MessageService.getMessages(the_id).then(function(payload){
        console.log("*****ALL MESSAGES****");
        console.log(payload);
      $scope.message_collection = payload.data.message;
     }, function(error){
       console.log("an error occurred");
     })

    $scope.message = {};
    $scope.postMessage = function() {
    MessageService.newMessage(the_id, $scope.message).then(function() {
      $route.reload();
      console.log("posted message");
    })
    }

    $scope.editMessage = function (message) {
      MessageService.editMessage(the_id, message).then(function(payload) {
        console.log("you edited the msg");
        $scope.message_collection = payload.data;
      })
      }

    $scope.deleteMessage = function (messageId) {
      MessageService.deleteMessage(the_id, messageId).then(function(payload) {
        console.log("you deleted the msg");
        $scope.message_collection = payload.data;
      })
      }

    TripDService.getTripDs(the_id).then(function(payload){
     $scope.tripd_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    })

    $scope.tripD = {};
    $scope.postTripD = function() {
    TripDService.newTripD(the_id, $scope.tripD).then(function() {
      $route.reload();
      console.log("posted trip detail");
    })
    }

    $scope.editTripD = function (tripd) {
      TripDService.editTripD(the_id, tripd).then(function(payload) {
        console.log("you edited the trip detail");
        $scope.tripd_collection = payload.data;
      })
      }

    $scope.deleteTripD = function (tripdId) {
      TripDService.deleteTripD(the_id, tripdId).then(function(payload) {
        console.log("you deleted the trip detail");
        $scope.tripd_collection = payload.data;
      })
      }

    $scope.members = {};
    $scope.postMembers = function() {
    MemberService.postMembers(the_id, $scope.members).then(function() {
      $route.reload();
      console.log("posted members");
    })
    }

    MemberService.getMembers(the_id).then(function(payload){
     $scope.member_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    })


}])
