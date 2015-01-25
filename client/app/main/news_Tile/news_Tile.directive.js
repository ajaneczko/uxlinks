'use strict';

angular.module('uxlinksApp')
  .directive('newsTile', function () {
    return {
      templateUrl: 'app/main/news_Tile/news_Tile.html',
       controller: function($scope,$http,Auth) {

               $scope.isLoggedIn = Auth.isLoggedIn;
             $scope.deleteThing = function(thing) {
               $http.delete('/api/things/' + thing._id);
             };


          },
      restrict: 'EA',
      scope: {
                        news: '=',
                        thing:'=',
                        index: '@'
                      },
      link: function (scope, element, attrs) {
      }
    };
  });
