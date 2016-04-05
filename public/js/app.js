var app = angular.module('angApp', ['ngRoute', 'ngResource', 'satellizer'])
   app.config(function($routeProvider, $locationProvider, $authProvider) {

   $routeProvider
       .when('/', {
           templateUrl: 'partials/splash.html',
           controller: 'LoginCtrl'
   })
       .when('/dashboard', {
           templateUrl: 'partials/dashboard.html',
           controller: 'MainController'
   })
       .when('/trips', {
           templateUrl: 'partials/trip.html',
           controller: 'MainController'
   })

   $authProvider.google({
     clientId: '746466032586-fkn4lk9v4pccpa005accokik9u2m13cb.apps.googleusercontent.com',
     url: '/auth/google',
     authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
     redirectUri: 'http://localhost:3000/_oauth/google',
     requiredUrlParams: ['scope'],
     optionalUrlParams: ['display'],
     scope: ['profile', 'email'],
     scopePrefix: 'openid',
     scopeDelimiter: ' ',
     display: 'popup',
     type: '2.0',
     popupOptions: { width: 452, height: 633 }
   });

   $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
   });

})
