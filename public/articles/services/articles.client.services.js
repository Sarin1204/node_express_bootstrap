/**
 * Created by sarin on 10/18/15.
 */
angular.module('articles').factory('Articles', ['$resource',
    function($resource) {
        return $resource('api/articles/:title', {
            title: '@title'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);