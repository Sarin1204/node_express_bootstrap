/**
 * Created by sarin on 10/17/15.
 */
angular.module('example').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'example/views/example.client.view.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);