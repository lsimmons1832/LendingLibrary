app.controller("BookListCtrl", function ($rootScope, $location, $scope, BookFactory) {
	$scope.books = [];

	let getBooks = () =>{
		BookFactory.getBookList().then((bookz)=>{
			$scope.books = bookz;
		}).catch((error)=>{
			console.log('', error);
		});
	};

	getBooks();

	$scope.selectedBook = [];

	$scope.checkoutBook = (selectedBook) =>{
			$scope.selectedBook = selectedBook;
			$scope.selectedBook.isCheckedOut = true;
			$scope.selectedBook.borroweruid = $rootScope.user.uid;
		BookFactory.borrowBook($scope.selectedBook).then(()=>{
			$location.url('/books/list/user');
		}).catch((error) => {
		console.log("Error borrowing book", error);
		});
	};

	

});