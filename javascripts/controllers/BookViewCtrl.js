app.controller("BookViewCtrl", function($location, $routeParams, $scope, BookFactory, RatingFactory){

	$scope.selectedBook = {};
	$scope.rating = [];
	
	BookFactory.getBookDetails($routeParams.id)
	.then((book) =>{
		$scope.selectedBook = book.data;
		RatingFactory.getRatings($scope.selectedBook.isbn).then((ratingz) =>{
			console.log("ratings returned", ratingz);
			$scope.rating = ratingz.data;
			}).catch((error) =>{
				console.log("Error returning rates", error);
			});
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