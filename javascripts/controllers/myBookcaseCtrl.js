	app.controller("myBookcaseCtrl", function ($scope, $rootScope, BookFactory) {
	
	$scope.myBooks = [];
	$scope.borrowedBooks = [];
	
		let getMyBooks = () => {
		BookFactory.getMyBooks($rootScope.user.uid)
		.then((userBooks)=>{
			$scope.myBooks = userBooks;
			console.log("items returned from BookFactory", userBooks);
		}).catch((error) => {
			console.log("getUser books error", error);
		});
	};

	getMyBooks();

	let myBorrowedBooks = () => {
		BookFactory.getBooks($rootScope.user.uid)
		.then((borrowedBooks) =>{
			$scope.borrowedBooks = borrowedBooks;
			console.log("my borrowed books", borrowedBooks);
		}).catch((error) =>{
			console.log("error getting borrowed books", error);
		});
	};

	//myBorrowedBooks();

	});
