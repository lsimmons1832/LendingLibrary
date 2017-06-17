app.factory("RatingFactory", function($http, $q, FIREBASE_CONFIG){
	
	let getRatings = (isbnTemp) => {
		let ratingz = [];
		return $q((resolve, reject) =>{
		$http.get(`${FIREBASE_CONFIG.databaseURL}/ratings.json?orderBy="isbn"&equalTo="${isbnTemp}"`)
			.then((fbRatings) => {
				let ratingCollection = fbRatings.data;
			if(ratingCollection !== null){
				Object.keys(ratingCollection).forEach((key) =>{
					ratingCollection[key].id = key;
					ratingz.push(ratingCollection[key]);
				});
			}
			resolve(ratingz);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let rateBook = (rate, isbn, uid) =>{
    return $q((resolve, reject) =>{
    	$http.post(`${FIREBASE_CONFIG.databaseURL}/ratings.json`, JSON.stringify({
    		rating: rate,
    		isbn: isbn,
    		uid: uid
    	})
    	).then((data) =>{
    		resolve(data);
    	}).catch((error) =>{
    		reject(error);
    	});

    });
	};

	let updateRating = (rate, isbn, uid) =>{
		return $q((resolve, reject) =>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/ratings.json?orderBy="uid"&equalTo="${uid}"`, JSON.stringify({
				rating: rate,
				isbn: isbn,
				uid: uid
			})
			).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let getAverageRating = (isbnTemp) =>{
		let ratez = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/ratings.json?orderBy="isbn"&equalTo="${isbnTemp}"`)
			.then((ratingz) =>{
				var rateCollection = ratingz.data;
				if(rateCollection !== null){
					Object.keys(rateCollection).forEach((key)=>{
						rateCollection[key].id=key;
						ratez.push(rateCollection[key]);
					});
				}
				let sum = 0;
				for (var i = 0; i < ratez.length; i++) {
					sum += parseInt(ratez[i].rating, 10);
				}
				let avg = sum/ratez.length;
				resolve(avg);
			}).catch((error) =>{
				reject(error);
			});
		});
	};

	return{getRatings:getRatings, rateBook: rateBook, updateRating: updateRating, getAverageRating:getAverageRating};
});