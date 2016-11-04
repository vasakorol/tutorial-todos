appTodos.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            title: 'Todos - Home Page'
        })
        .when('/registration', {
            templateUrl: 'pages/registration.html',
            controller: 'registrationController',
            title: 'Todos - Registration Page'
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController',
            title: 'Todos - Login Page'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController',
            title: 'Todos - About Page'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController',
            title: 'Todos - Contract Page'
        })
        .when('/users', {
            templateUrl: 'pages/users.html',
            controller: 'UsersController',
            title: 'Todos - About Page'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
});

appTodos.factory('accessFactory', function ($localStorage) {
    var object = {};
    var userRoleUrls = ['home', 'about', 'contact', 'logout'];
    var guestRoleUrls = ['home', 'about', 'contact', 'login', 'registration'];
    var adminRoleUrls = ['home', 'about', 'contact', 'users', 'logout'];
    object.checkPermission = function (url) {
        var permission = [];
        if ($localStorage.userRole == 'admin') {
            permission = adminRoleUrls;
        } else if ($localStorage.userRole == 'user') {
            permission = userRoleUrls;
        } else {
            permission = guestRoleUrls;
        }
        if (permission.indexOf(url) !== -1) {
            return true;
        }
        return false;
    };
    return object;
});