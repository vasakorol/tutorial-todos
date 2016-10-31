appTodos.controller('loginController', function ($scope, Users) {
    console.log('login');
    $scope.message = 'Login Everyone come and see how good i look!';

    $scope.users = {};

    $scope.login = function () {
        if ($scope.loginForm.$valid) {

        }
    };


    $scope.reset = function (form) {
        if (form) {
            Users.get().then(function(data){
                $scope.users = data;
            });
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = {};
    };

});