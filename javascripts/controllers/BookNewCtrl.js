app.controller("BookNewCtrl", function($location, $rootScope, $scope, BookFactory, GOOGLE_BOOKS){
		$scope.books = [];
		$scope.dropDown ="";
		$scope.searchText = "";
		let key = GOOGLE_BOOKS.apiKey;

		 $scope.setdropDown = (searchType) =>{
			$scope.dropDown = searchType;
		}

		$scope.getNewBooks = () =>{
		BookFactory.getGoogleBooksByTitle($scope.dropDown, $scope.searchText, key).then((bookz)=>{
			//console.log("books returned", bookz.data.items);
			$scope.books = bookz.data.items;
		}).catch((error)=>{
			console.log('', error);
		});
	}
	
	$scope.newBook= {};
	
	//$scope.captureBookData = () =>{
	//	$scope.newBook.title;
	//	$scope.newBook.imageLink;
	//	$scope.newBook.author;
	//	$scope.newBook.description;
	//	$scope.newBook.isbn;
	//}

		$scope.addNewBook = (item) => {
			$scope.newBook = item;
			$scope.newBook.isCheckedOut = false;
			$scope.newBook.uid = $rootScope.user.uid;
			$scope.newBook.borrowerUid = "";
			BookFactory.postNewBook($scope.newBook).then((response) =>{
				$scope.newBook = {};
				$location.url("/books/list/user");
			}).catch((error) => {
				console.log("Add error", error);
			});
		};

});