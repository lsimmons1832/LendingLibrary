app.controller("BookViewCtrl", function($routeParams, $scope, BookFactory){

	$scope.selectedBook = {};
	
	BookFactory.getBookDetails($routeParams.id)
	.then((book) =>{
		$scope.selectedBook = book.data;
	}).catch((error) =>{
		console.log("Error getting book details", error);
	});

});