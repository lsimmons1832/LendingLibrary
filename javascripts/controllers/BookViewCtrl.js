app.controller("BookViewCtrl", function($location, $routeParams, $scope, BookFactory){

	$scope.selectedBook = {};
	
	BookFactory.getBookDetails($routeParams.id)
	.then((book) =>{
		$scope.selectedBook = book.data;
	}).catch((error) =>{
		console.log("Error getting book details", error);
	});

	$scope.checkoutBook = () =>{
		BookFactory.borrowBook($scope.selectedBook).then(()=>{
			$location.url('/books/list/user'); //think about adding books/list/user
		}).catch((error) => {
		console.log("Error borrowing book", error);
		});
	};

});