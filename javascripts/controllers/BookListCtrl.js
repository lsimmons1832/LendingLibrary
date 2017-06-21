app.controller("BookListCtrl", function($rootScope, $location, $scope, BookFactory, WaitListFactory) {
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

    $scope.waitList = [];

    $scope.addToWaitList = (waitList) => {
    	$scope.waitList = waitList;
    	$scope.waitList.uid = $rootScope.user.uid;
    	$scope.waitList.date = new Date();
    	WaitListFactory.addMeToTheList($scope.waitList).then(() =>{
    		$location.url('/books/list');
    	}).catch((error)=>{
    		console.log("Error adding to waiting list", error);
    	});
    };

});