app.factory("RatingFactory", function($http, $q, FIREBASE_CONFIG){
	
	//let getRatings = (bookISBN) => {
	//	let ratingz = {};
	//	return $q((resolve, reject) =>{
	//	$http.get(`${FIREBASE_CONFIG.databaseURL}/ratings.json?orderBy"bookISBN"&equalTo=${isbn}`)
	//		.then((fbRatings) => {
	//			let ratingCollection = fbRatings.data;
	//		if(ratingCollection !== null){
	//			Object.keys(ratingCollection).forEach((key) =>{
	//				ratingCollection[key].id = key;
	//				ratingz.push(ratingCollection[key]);
	//			});
	//		}
	//		resolve(ratingz);
	//		}).catch((error) => {
	//			reject(error);
	//		});
	//	});
	//};
    //
	//return{getRatings:getRatings};
});