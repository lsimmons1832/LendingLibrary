app.controller("BookListCtrl", function ($rootScope, $scope, BookFactory) {
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