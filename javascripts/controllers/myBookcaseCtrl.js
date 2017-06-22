	app.controller("myBookcaseCtrl", function ($scope, $rootScope, BookFactory, WaitListFactory, $window) {
	
	$scope.myBooks = [];
	$scope.borrowedBooks = [];
	$scope.book = [];
	$scope.waitingList = [];
	
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
	
	$scope.returnBook = (book) =>{
		WaitListFactory.getList(book.isbn).then((data) =>{
			if(data.length > 0){
				data.sort((a, b)=>{
					a = new Date(a.date);
					b = new Date(b.date);
					// return a > b? -1:a < b?1:0
					return a-b;
				});
				book.borroweruid = data[0].uid;
			}else{
				book.isCheckedOut = false;
				book.borroweruid = "";
			}
			BookFactory.bookReturn(book).then(() => {
			  myBorrowedBooks();
			}).catch(() => {
				console.log("Error returning the book", error);
			});
		}).catch((error) =>{
		console.log("Error getting waiting list", error);
		});

	};

	});
