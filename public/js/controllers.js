app.controller('MainController', ['$scope', '$http', function($scope, $http){
     $scope.test='HTML and Routes Working';

     $scope.togglePostForm = function () {
       $scope.showme = !$scope.showme;
     }

}])

app.controller('LoginCtrl', function($scope, $auth) {
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider);
  };
});
