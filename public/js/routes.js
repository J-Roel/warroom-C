var app = angular.module("Warroom");



app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/views/home.html'
      })
      .when('/overview', {
      	templateUrl: 'js/views/overview.html',
      	controller: 'ServerController as SC'
      })
      .when('/server/:id', {
        templateUrl: 'js/views/server.html',
        controller: 'ServerController as SC',
      })
      .when('/settings', {
        templateUrl: 'js/views/settings.html',
        //controller: 'ServerController as SC',
      })
});
