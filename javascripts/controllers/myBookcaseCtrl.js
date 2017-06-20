	app.controller("myBookcaseCtrl", function ($scope, $rootScope, BookFactory, $window) {
	
	$scope.myBooks = [];
	$scope.borrowedBooks = [];
	$scope.book = [];
	
		let getMyBooks = () => {
		BookFactory.getMyBooks($rootScope.user.uid)
		.then((userBooks)=>{
			$scope.myBooks = userBooks;
		}).catch((error) => {
			console.log("getUser books error", error);
		});
	};

	getMyBooks();

	let myBorrowedBooks = () => {
		BookFactory.getBooks($rootScope.user.uid)
		.then((loans) =>{
			$scope.borrowedBooks = loans;
		}).catch((error) =>{
			console.log("error getting borrowed books", error);
		});
	};
    
	myBorrowedBooks();
	
	$scope.deleteBook = (id) => {
		BookFactory.removeBook(id).then(() => {
			getMyBooks();
		}).catch((error) =>{
			console.log("Error deleting book", error);
		});
	};
	
	//I need a function that will check to see if there is a waitinglist for a book before attempting to 
	//return the book.  If there is a waiting list. I need to update the borroweruid on the book to
	//reflect the uid of the user with the oldest request date
	
	//checking to see if waitinglist exist
	let getWaitingList  = (isbn) =>{
		$scope.book.isbn = isbn;
		WaitListFactory.getList($scope.book.isbn).then((data) =>{
		resolve(data);
		}).catch((error) =>{
		console.log("Error getting waiting list", error);
		});
	};


	$scope.returnBook = (book) =>{
		$scope.book = book;
		$scope.book.isCheckedOut = false;
		$scope.book.borroweruid = "";
		BookFactory.bookReturn($scope.book).then(() => {
		  myBorrowedBooks();
		}).catch(() => {
			console.log("Error returning the book", error);
		});
	};

	});
