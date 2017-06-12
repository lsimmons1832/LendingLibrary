app.factory("BookFactory", function($http, $q, FIREBASE_CONFIG){

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
	return{getBookList: getBookList, getBookDetails: getBookDetails};
});