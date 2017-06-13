app.controller("BookNewCtrl", function($scope, BookFactory, GOOGLE_BOOKS){
		$scope.books = [];
		$scope.dropDown ="";
		$scope.searchText = "";
		let key = GOOGLE_BOOKS.apiKey;

		 $scope.setdropDown = (searchType) =>{
			$scope.dropDown = searchType;
		}

		$scope.getNewBooks = () =>{
			console.log("I'm here");
		BookFactory.getGoogleBooksByTitle($scope.dropDown, $scope.searchText, key).then((bookz)=>{
			console.log("books returned", bookz.data.items);
			$scope.books = bookz.data.items;
		}).catch((error)=>{
			console.log('', error);
		});
	}


});