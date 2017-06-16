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
					});
				}
				resolve(bookz);
			}).catch((error)=>{
				reject(error);
			});
		});
	};

	let getBooks= (borrower) =>{
		let loans = [];
		return $q((resolve,reject) =>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/books.json?orderBy="borroweruid"&equalTo="${borrower}"`)
			.then((fbBooks) =>{
				var bookCollection = fbBooks.data;
				if(bookCollection !== null){
					Object.keys(bookCollection).forEach((key)=>{
						bookCollection[key].id=key;
						loans.push(bookCollection[key]);
					});
				}
				resolve(loans);
			}).catch((error)=>{
				reject(error);
			});
		});
	};



	let getMyBooks = (userId) => {
		let myBooks = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/books.json?orderBy="uid"&equalTo="${userId}"`)
			.then((fbBookz) =>{
				let bookCollection = fbBookz.data;
				if(bookCollection !== null){
					Object.keys(bookCollection).forEach((key) => {
					bookCollection[key].bookId = key;
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
			console.log("what is book", book);
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
					borroweruid: book.borroweruid	
				})
			).then((results) =>{
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};


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
	
	let postNewBook = (newBook) =>{
		console.log(newBook);
		return $q ((resolve, reject) =>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/books.json`, 
			JSON.stringify({
					isCheckedOut: newBook.isCheckedOut,
					title: newBook.title,
					imageLink: newBook.imageLinks.thumbnail,
					author: newBook.authors[0],
					description: newBook.description,
					isbn: newBook.industryIdentifiers[0].identifier,
					uid: newBook.uid,
					borroweruid: newBook.borroweruid	
				})
			).then((resultz) =>{
				resolve(resultz);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	let removeBook = (id) => {
		return $q((resolve, reject) =>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/books/${id}.json`)
			.then((remove) =>{
				resolve(remove);
			}).catch((error) =>{
				reject(error);
			});
		});
	};

	let bookReturn = (book) => {
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
				borroweruid: book.borroweruid	
			})
			).then(() => {
				resolve();
			}).catch((error) => {
				reject(error);
			});
		});
	};



	return{getBookList: getBookList, 
		   getBooks: getBooks, 
		   getBookDetails: getBookDetails, 
		   borrowBook: borrowBook, 
		   getMyBooks: getMyBooks, 
		   getGoogleBooksByTitle: getGoogleBooksByTitle, 
		   postNewBook: postNewBook, 
		   removeBook: removeBook,
		   bookReturn: bookReturn
			};
});