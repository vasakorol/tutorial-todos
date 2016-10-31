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
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
});

appTodos.run(function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
});