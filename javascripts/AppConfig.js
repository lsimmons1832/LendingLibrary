app.config(function ($routeProvider) {
	$routeProvider
			.when('/auth', {
			templateUrl:'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/items/list', {
			templateUrl:'partials/book-list.html',
			controller: 'BookListCtrl',
			resolve : {isAuth}
		})
		.when('/items/new', {
			templateUrl:'partials/book-new.html',
			controller: 'BookNewCtrl',
			resolve : {isAuth}
		})
		.when('/item/view/:id', {
			templateUrl: 'partials/book-view.html',
			controller: 'BookViewCtrl',
			resolve : {isAuth}
		})
		.when('/item/edit/:id', {
			templateUrl:'partials/book-new.html',
			controller: 'BookEditCtrl',
			resolve : {isAuth}
		})
		.when('/logout', {
			templateUrl:'partials/auth.html',
			controller: 'AuthCtrl',
			resolve : {isAuth}
		})
		.otherwise('/auth');
});