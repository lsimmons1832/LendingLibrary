app.factory("BookFactory", function($http, $q, FIREBASE_CONFIG, GOOGLE_BOOKS){

	let getBookList = () =>{
		let bookz = [];
		return $q((resolve,reject) =>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/books.json`)
			.then((fbBooks) =>{
				var bookCollection = fbBooks.data;
				if(bookCollection !== null){
					Object.keys(bookCollection).forEach((key)=>{
						bookCollection[key].id=key;
						bookz.push(bookCollection[key]);
						console.log("show fb return", bookz);
					});
				}
				resolve(bookz);
			}).catch((error)=>{
				reject(error);
			});
		});
	};

	let getMyBooks = (uid) => {
		let myBooks = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/books.json?orderBy='uid'&equalTo=${uid}`)
			.then((fbBookz) =>{
				let bookCollection = fbBookz.data;
				if(bookColletion !== null){
					Object.keys(bookCollection).forEach((key) => {
					bookCOllection[key].bookId = key;
					myBooks.push(bookCollection[key]);
					});
				}
				resolve(myBooks);
			}).catch((error)=>{
				reject(error);
			});
		});
	};

	let getBookDetails = (id) => {
	return $q((resolve, reject) =>{
		$http.get(`${FIREBASE_CONFIG.databaseURL}/books/${id}.json`)
		.then((details) =>{
			details.data.id = id;
			resolve(details);
		}).catch((error)=>{
		reject(error);
		});
	});
};

		let borrowBook = (book) => {
			return $q((resolve, reject) => {
				$http.put(`${FIREBASE_CONFIG.databaseURL}/books/${book.id}.json`,
				JSON.stringify({
					isCheckedOut: book.isCheckedOut,
					title: book.title,
					imageLink: book.imageLink,
					author: book.author,
					description: book.description,
					isbn: book.isbn,
					uid: book.uid,
					borroweruid: book.borrowerUid	
				})
			).then((results) =>{
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	// console.log("searchText", searchText);
	let getGoogleBooksByTitle = (dropDown, searchText, key) =>{
		return $q((resolve, reject) =>{
			$http.get(`${GOOGLE_BOOKS.databaseURL}+${dropDown}:${searchText}&key=${key}`)
			.then((data) =>{
				resolve(data);
			}).catch((error) =>{
				console.log(error);
			});
	  });
	};

	return{getBookList: getBookList, getBookDetails: getBookDetails, borrowBook: borrowBook, getMyBooks: getMyBooks, getGoogleBooksByTitle: getGoogleBooksByTitle};
});