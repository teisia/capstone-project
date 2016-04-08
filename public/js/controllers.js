app.controller('LoginCtrl', function($scope, $auth) {
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider);
  };
});

app.controller('MainController', ['$scope', '$http', '$routeParams', 'TripService', function($scope, $http, $routeParams, TripService){

     $scope.toggleNewTripForm = function () {
       $scope.showme = !$scope.showme;
     }

    TripService.getTrips().then(function(payload){
     $scope.trip_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    });

    $scope.trip = {};
    $scope.postTrip = function() {
    TripService.newTrip($scope.trip).then(function() {
      console.log("posted trip");
    })
    }
}])

app.controller('SingleTripController', ['$scope', '$http', '$routeParams', 'TripService', 'UserService', 'TaskService', function($scope, $http, $routeParams, TripService, UserService, TaskService){

    $scope.toggleEditTripForm = function () {
      $scope.showmeET = !$scope.showmeET;
    }

    $scope.toggleNewTaskForm = function () {
      $scope.showmeNT = !$scope.showmeNT;
    }

    the_id = $routeParams.id;

    TripService.getTrip(the_id).then(function(payload){
      $scope.singleTrip = payload.data[0];
    }, function(error){
      console.log("an error occurred");
    });

    TripService.editTrip(the_id).then(function(payload) {
      $scope.tripInfo = payload.data[0];
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

    $scope.task = {};
    $scope.postTask = function() {
    TaskService.newTask(the_id, $scope.task).then(function() {
      console.log("posted task");
    })
    }

    


}])
