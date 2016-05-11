//Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);



//Routing 
weatherApp.config(function($routeProvider){
   
    $routeProvider
    
    .when('/',{
        
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/forecast',{
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days',{
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});


//Services

weatherApp.service('cityService',function(){
    
    this.city = "  ";
})

//Contollers
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){
       
        cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope, $resource,$routeParams,cityService){
    
  $scope.city = cityService.city;
    
  $scope.days = $routeParams.days || '2';

  $scope.appid = "1c3602f494b221b4d49fa7985cbc8636" ;
    
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"
      },
      {
        get: {method: "JSONP"}
      }
  );  
    
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city , cnt:$scope.days , appid: $scope.appid});
    
    $scope.convertToDegree = function(degC) {
        
        return Math.round(degC - 273.15);
    }
    
    
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }
    
   
    
}]);

//Directives





