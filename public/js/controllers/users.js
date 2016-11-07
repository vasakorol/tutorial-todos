appTodos.controller('UsersController', function ($scope, $location, Users, ngDialog, SweetAlert) {
    $scope.users = {};
    $scope.user = {};

    $scope.reload = function () {
        Users.get().then(function (data) {
            $scope.users = angular.fromJson(data);
        });
    };

    $scope.editModalOpen = function (userId) {
        Users.get(userId).then(function (data) {
            $scope.user = data[0];
            ngDialog.open({
                template: 'pages/users/edit.html',
                scope: $scope,
                controller: function ($scope) {
                    $scope.saveEdited = function () {
                        if ($scope.editUserForm.$valid) {
                            if ($scope.user.password == $scope.user.password_confirm) {
                                delete $scope.user.password_confirm;
                                Users.put($scope.user._id, $scope.user).then(function (data) {
                                    SweetAlert.swal("User successfully updated", "", "success");
                                    $scope.reload();
                                    ngDialog.closeAll();
                                });
                            }
                        }
                    }
                }
            });
        });
    };

    $scope.remove = function (userId) {
        SweetAlert.swal({
            title: 'Are You sure You want remove this user?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
        }, function (isConfirmed) {
            if (isConfirmed) {
                Users.get(userId).then(function (data) {
                    alert('1111');
                    //SweetAlert.swal({title: "User successfully removed", text: "", type: "success"});
                });
            }
        });
    };

    $scope.reload();
});