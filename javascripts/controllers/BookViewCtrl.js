app.controller("BookViewCtrl", function($location, $rootScope, $routeParams, $scope, BookFactory, RatingFactory){

	$scope.selectedBook = {};
	$scope.ratings = [];
	
	BookFactory.getBookDetails($routeParams.id)
	.then((book) =>{
		$scope.selectedBook = book.data;
		RatingFactory.getRatings($scope.selectedBook.isbn).then((ratingz) =>{
			console.log("ratings returned", ratingz);
			$scope.ratings = ratingz;
			}).catch((error) =>{
				console.log("Error returning rates", error);
			});
		}).catch((error) =>{
		console.log("Error getting book details", error);
	});

	$scope.checkoutBook = () =>{
			$scope.selectedBook.isCheckedOut = true;
			$scope.selectedBook.borroweruid = $rootScope.user.uid;
		BookFactory.borrowBook($scope.selectedBook).then(()=>{
			$location.url('/books/list/user'); //think about adding books/list/user
		}).catch((error) => {
		console.log("Error borrowing book", error);
		});
	};

	//TESTING UI-BOOTSTRAP RATING

	$scope.rate = $scope.ratings;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

 $scope.rateMe = (rate, book) =>{
 	console.log("rate", rate);
 	console.log("book", book);
 	$scope.rate = rate;
 	RatingFactory.rateBook($scope.rate, book.isbn, book.borroweruid).then(() =>{
 		$location.url('/book/view');
 		
 	}).catch((error) =>{
 		console.log("Error capturing rating", error);
 	});
 };

});