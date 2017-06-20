app.controller("BookViewCtrl", function($location, $rootScope, $routeParams, $scope, BookFactory, RatingFactory, WaitListFactory) {

    $scope.selectedBook = [];
    $scope.averageRatings = 0;
    $scope.rated = 0;
    $scope.ratings = [];

    let getBook = () => {
        BookFactory.getBookDetails($routeParams.id)
            .then((book) => {
                $scope.selectedBook = book.data;
                RatingFactory.getAverageRating($scope.selectedBook.isbn).then((ratingz) => {
                    console.log("ratings returned", ratingz);
                    $scope.averageRatings = ratingz;
                    $scope.rated = ratingz.rating;
                }).catch((error) => {
                    console.log("Error returning rates", error);
                });
            }).catch((error) => {
                console.log("Error getting book details", error);
            });
    };

    getBook();

    let getAllRatings = () => {
        RatingFactory.getRatings($scope.selectedBook.isbn).then((ratingz) => {
            console.log("ratings returned", ratingz);
            $scope.averageRatings = ratingz;
            $scope.rated = ratingz.rating;
        }).catch((error) => {
            console.log("Error returning rates", error);
        });
    };

    $scope.checkoutBook = () => {
        $scope.selectedBook.isCheckedOut = true;
        $scope.selectedBook.borroweruid = $rootScope.user.uid;
        BookFactory.borrowBook($scope.selectedBook).then(() => {
            $location.url('/books/list/user'); //think about adding books/list/user
        }).catch((error) => {
            console.log("Error borrowing book", error);
        });
    };

    //TESTING UI-BOOTSTRAP RATING

    $scope.rate = $scope.averageRatings;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.rateMe = (rate, book) => {
        console.log("rate", rate);
        console.log("book", book);
        $scope.rate = rate;
        if ($scope.ratings.uid !== $rootScope.user.uid) {
            RatingFactory.rateBook($scope.rate, book.isbn, $rootScope.user.uid)
                .then(() => {
                    getBook();
                }).catch((error) => {
                    console.log("Error capturing rating", error);
                });
        } else if ($scope.rated > 0 && $scope.ratings.uid === $rootScope.user.uid) {
            RatingFactory.updateRating($scope.rate, book.isbn, $rootScope.user.uid)
                .then(() => {
                    getBook();
                    $scope.rated = true;
                }).catch((error) => {
                    console.log("Error capturing rating", error);
                });
        }
    };

    let isCheckedOut = () => {
        return $scope.selectedBook.isCheckedOut ? true : false;
    };

    $scope.waitList = [];

    $scope.addToWaitList = (waitList) => {
	console.log("waitlist",waitList);
    	$scope.waitList = waitList;
    	$scope.waitList.uid = $rootScope.user.uid;
    	$scope.waitList.date = new Date();
    	WaitListFactory.addMeToTheList($scope.waitList).then(() =>{
    		$location.url('book/list');
    	}).catch((error)=>{
    		console.log("Error adding to waiting list", error);
    	});
    };

});