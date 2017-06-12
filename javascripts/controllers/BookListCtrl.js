app.controller("BookListCtrl", function ($location, $rootScope, $scope, BookFactory) {
	$scope.books = [];

	let getBooks = () =>{
		BookFactory.getBookList().then((bookz)=>{
			$scope.books = bookz;
		}).catch((error)=>{
			console.log('', error);
		});
	};

	getBooks();

	//$scope.myBooks = $routeParams.uid === $rootScope.user.uid ? true : false;
	//$scope.username = '';
	//UserFactory.getUser($routeParams.uid)
	//.then(user => $scope.username = user.username)
	//.catch(error => console.log("Error geting username", error));
	
	$scope.myBooks = {};

	//let getMyBooks = () =>{
	//	BookFactory.getSingleUserBooks($rootScope.user.uid)
	//	.then((books) =>{
	//	$scope.myBooks = books;
	//	$location.url('/books/list/user');
	//	}).catch((error) =>{
	//		console.log("Error getting User specific books", error);
	//	});
	//};
	
		let getMyBooks = () => {
		BookFactory.getSingleUserBook($rootScope.user.uid)
		.then((userBooks)=>{
			console.log("userBooks", userBooks);
			return BookFactory.getBooks(userBooks.borrowerUid);
		}, (error)=>{
			 console.log("Error getting User specific books", error);
		}).then((books) =>{
			console.log("books", books);
			$rootScope.myBooks = books;
			$location.url('/books/list/user');
		}).catch((error) => {
			console.log("getUser error", error);
		});
	};
});