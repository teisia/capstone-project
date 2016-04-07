app.controller('LoginCtrl', function($scope, $auth) {
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider);
  };
});

app.controller('MainController', ['$scope', '$http', '$routeParams', 'TripService', function($scope, $http, $routeParams, TripService){

     $scope.toggleNewTripForm = function () {
       $scope.showme = !$scope.showme;
     }

     $scope.toggleEditTripForm = function () {
       $scope.showmeET = !$scope.showmeET;
     }

     $scope.toggleNewTaskForm = function () {
       $scope.showmeNT = !$scope.showmeNT;
     }

    TripService.getTrips().then(function(payload){
     $scope.trip_collection = payload.data;
      console.log(payload.data);
    }, function(error){
      console.log("an error occurred");
    });

    the_id = $routeParams.id;
    console.log("my params are "+the_id);

    TripService.getTrip(the_id).then(function(payload){
      $scope.singleTrip = payload.data[0];
    }, function(error){
      console.log("an error occurred");
    });

    $scope.trip = {};
    $scope.postTrip = function() {
    TripService.newTrip($scope.trip).then(function() {
      console.log("posted trip");
    })
    }

    TripService.editTrip(the_id).then(function(payload) {
      $scope.tripInfo = payload.data[0];
      console.log(payload);
    })

}])
