var appTodos = angular.module('todosApp', ['ngRoute', 'oitozero.ngSweetAlert', 'ngStorage']);
appTodos.run(function ($location, $rootScope, $localStorage, accessFactory) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        var currentUrl = current.$$route.originalPath.substring(1);
        if(currentUrl.length == 0) {
            currentUrl = 'home';
        }
        if(!accessFactory.checkPermission(currentUrl)) {
            if (typeof previous === 'undefined') {
                $location.path('/');
            } else {
                $location.path(previous.$$route.originalPath);
            }
        }
    });
    $localStorage.$default({
        isAuthenticated: false,
        userRole: 'guest',
        userId: null
    });
    $rootScope.logout = function () {
        $localStorage.$reset({
            isAuthenticated: false,
            userRole: 'guest',
            userId: null
        });
    };
});