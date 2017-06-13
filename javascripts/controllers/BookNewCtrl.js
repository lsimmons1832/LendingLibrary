app.controller("BookNewCtrl", function($scope, BookFactory, appConstants){
		$scope.books = {};
		$scope.dropDown;
		$scope.searchText;
		$scope.key = appConstants.GOOGLE_BOOKS.apikey;


		let getNewBooks = (dropDown,searchText, key) =>{
			console.log("I'm here");
			console.log("drop down", dropDown);
			console.log("search", searchText);
			console.log("key", key);
		BookFactory.getGoogleBooksByTitle().then((bookz)=>{
			$scope.books = bookz;
		}).catch((error)=>{
			console.log('', error);
		});
	}

	getNewBooks();



});