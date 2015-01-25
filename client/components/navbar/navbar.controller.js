'use strict';

angular.module('uxlinksApp')
.controller('NavbarCtrl', function ($scope, $location, $modal, Auth, $http) {



   $scope.items = ['item1', 'item2', 'item3'];
      $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });


      };

    $scope.menu = [{
      //'title': 'Home',
      //'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  })

   .controller('ModalInstanceCtrl', function ($scope, $modalInstance,$http, items) {
        $http.get('/api/things').success(function(awesomeThings) {
          $scope.awesomeThings = awesomeThings;
        });

        $scope.addThing = function() {
          if($scope.title === '') {
            return;
          }

          $http.post('/api/things', { name: $scope.title, info: $scope.link });
          $scope.title = '';
          $scope.link = '';

        };

        $scope.deleteThing = function(thing) {
          $http.delete('/api/things/' + thing._id);
        };
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
