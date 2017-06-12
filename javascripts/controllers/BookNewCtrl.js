app.controller("BookNewCtrl", function($scope, BookFactory){
		$scope.books = {};

		let getNewBooks = () =>{
		BookFactory.getGoogleBooksByTitle().then((bookz)=>{
			$scope.books = bookz;
		}).catch((error)=>{
			console.log('', error);
		});
	};

	getNewBooks();
});