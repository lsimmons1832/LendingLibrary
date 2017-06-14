app.controller("BookListCtrl", function ($rootScope, $location, $rootScope, $scope, BookFactory) {
	$scope.books = [];

	let getBooks = () =>{
		BookFactory.getBookList().then((bookz)=>{
			$scope.books = bookz;
		}).catch((error)=>{
			console.log('', error);
		});
	};

	getBooks();

	

});