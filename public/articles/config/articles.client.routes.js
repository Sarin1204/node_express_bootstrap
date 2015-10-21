/**
 * Created by sarin on 10/18/15.
 */
angular.module('articles').config(['$routeProvider',
function($routeProvider){
    $routeProvider.
        when('/articles',{
            templateUrl: 'articles/views/list-articles.client.view.html'
        }).
        when('/articles/create',{
            templateUrl: 'articles/views/create-article.client.view.html'
        }).
        when('/articles/:title', {
            templateUrl: 'articles/views/view-article.client.view.html'
        }).
        when('/articles/:title/edit', {
            templateUrl: 'articles/views/edit-article.client.view.html'
        });
    }
]);