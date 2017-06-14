	app.controller("myBookcaseCtrl", function ($scope, $rootScope, BookFactory, $window) {
	
	$scope.myBooks = [];
	$scope.borrowedBooks = [];
	
		let getMyBooks = () => {
		BookFactory.getMyBooks($rootScope.user.uid)
		.then((userBooks)=>{
			$scope.myBooks = userBooks;
			console.log("Books I own", userBooks);
		}).catch((error) => {
			console.log("getUser books error", error);
		});
	};

	getMyBooks();

	let myBorrowedBooks = () => {
		BookFactory.getBooks($rootScope.user.uid)
		.then((loans) =>{
			$scope.borrowedBooks = loans;
			console.log("my borrowed books", loans);
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
	
	//TESTING UI-BOOTSTRAP TABBING
	
//$scope.tabs = [
//    { title:'Dynamic Title 1', content:'Dynamic content 1' },
//    { title:'Dynamic Title 2', content:'Dynamic content 2' }
//  ];

  //$scope.alertMe = function() {
  //  setTimeout(function() {
  //    $window.alert('You\'ve selected the alert tab!');
  //  });
  //};

  //$scope.model = {
  //  name: 'Tabs'
  //};

	});
