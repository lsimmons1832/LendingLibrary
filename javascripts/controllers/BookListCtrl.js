app.controller("BookListCtrl", function($rootScope, $location, $scope, BookFactory, WaitListFactory, $window, $route, $interval) {
    $scope.books = [];

    let getBooks = () => {
        BookFactory.getBookList().then((bookz) => {
            $scope.books = bookz;
        }).catch((error) => {
            console.log('', error);
        });
    };

    getBooks();

    $scope.selectedBook = [];

    $scope.checkoutBook = (selectedBook) => {
        $scope.selectedBook = selectedBook;
        $scope.selectedBook.isCheckedOut = true;
        $scope.selectedBook.borroweruid = $rootScope.user.uid;
        BookFactory.borrowBook($scope.selectedBook).then(() => {
            $location.url('/books/list/user');
        }).catch((error) => {
            console.log("Error borrowing book", error);
        });
    };

    let isCheckedOut = () => {
        return $scope.books.isCheckedOut ? true : false;
    };

	let callInterval = () => {
    console.log("Interval occurred");
	};

    $scope.addToWaitList = (waitList) => {
       	waitList.uid = $rootScope.user.uid;
    	waitList.date = new Date();
    	WaitListFactory.addMeToTheList(waitList).then(() =>{
    	}).catch((error)=>{
    		console.log("Error adding to waiting list", error);
    	});
		$scope.dynamicPopover = {
			content: "You've been added to the waiting list",
			templateUrl: 'myPopoverTemplate.html'
		};
		 //$interval(callInterval, 10000); //comment out until you can get the popover fixed
		//$route.reload('/books/list');
    };
});