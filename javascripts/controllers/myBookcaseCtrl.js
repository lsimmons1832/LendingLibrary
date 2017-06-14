	app.controller("myBookcaseCtrl", function ($scope, $rootScope, BookFactory, $window) {
	
	$scope.myBooks = [];
	$scope.borrowedBooks = [];
	
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
	
	$scope.returnBook = (id) =>{
		BookFactory.returnBook(id).then(() => {
		  myBorrowedBooks();
		}).catch(() => {
			console.log("Error returning the book", error);
		});
	};

	});
