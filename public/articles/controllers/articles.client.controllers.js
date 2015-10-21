/**
 * Created by sarin on 10/18/15.
 */
angular.module('articles').controller('ArticlesController', ['$scope',
'$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles)
    {
        $scope.authentication = Authentication;

        $scope.create = function() {
         var article = new Articles({
             created: new Date,
             title: this.title,
             content: this.content
         });
            article.$save(function(response){
               $location.path('articles/' + response.title);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function(){
            $scope.article = Articles.get({
                title: $routeParams.title
            });
        };

        $scope.update = function(){
            $scope.article.$update(function(){
                $location.path('articles/' + $scope.article.title);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(article) {
            if(article) {
                article.$remove(function(){
                    for (var i in $scope.articles) {
                        if($scope.articles[i] === article){
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.article.$remove(function(){
                   $location.path('articles');
                });
            }
        };
    }



]);