var app = angular.module('angApp', ['ngRoute'])
       app.config(function($routeProvider) {
           $routeProvider
               .when('/', {
                   templateUrl: '../partials/index.html',
                   controller: 'MainController'
               })
               .otherwise({redirectTo : '/'})
       })
