app.controller('LoginCtrl', function($scope, $auth) {
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider);
  };
});

app.controller('MainController', ['$scope', '$http', '$routeParams', 'TripService', 'UserService', function($scope, $http, $routeParams, TripService, UserService){

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

    UserService.getUsers().then(function(payload) {
      $scope.user_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    })

}])

app.controller('SingleTripController', ['$scope', '$http', '$routeParams', '$location', 'TripService', 'UserService', 'TaskService', 'MessageService', function($scope, $http, $routeParams, $location, TripService, UserService, TaskService, MessageService){

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

    var the_id = $routeParams.id;

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
     $scope.message_collection = payload.data;
    }, function(error){
      console.log("an error occurred");
    })

    $scope.message = {};
    $scope.postMessage = function() {
    MessageService.newMessage(the_id, $scope.message).then(function() {
      console.log("posted message");
    })
    }


}])
