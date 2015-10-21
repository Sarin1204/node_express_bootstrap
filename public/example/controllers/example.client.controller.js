/**
 * Created by sarin on 10/17/15.
 */
angular.module('example').controller('ExampleController', ['$scope',
    'Authentication',
    function($scope, Authentication){
        $scope.authentication = Authentication
    }
])