var app = angular.module('angApp', ['ngRoute', 'satellizer'])

   app.config(function($routeProvider, $authProvider) {

   $routeProvider
       .when('/', {
           templateUrl: 'partials/splash.html',
           controller: 'LoginCtrl'
         })
       .when('/dashboard', {
           templateUrl: 'partials/dashboard.html',
           controller: 'MainController'
         })
       .when('/trips/:id', {
           templateUrl: 'partials/trip.html',
           controller: 'SingleTripController'
         })

       .when('/sign-out', {
           templateUrl: 'partials/splash.html',
           controller: 'LogOutCtrl'
         })
        .otherwise({
           redirectTo: '/dashboard'
         });

   $authProvider.google({
     clientId: '746466032586-fkn4lk9v4pccpa005accokik9u2m13cb.apps.googleusercontent.com'
   })

    $authProvider.google({
      url: 'https://plantogether.herokuapp.com',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: "https://plantogether.herokuapp.com/auth/google",
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 452, height: 633 }
   });

})
