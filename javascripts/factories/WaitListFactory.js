app.factory("WaitListFactory", function($http, $q, FIREBASE_CONFIG) {
	
	let addMeToTheList = (list) => {
		console.log("what am I sending for the wait list?", list);
		return $q((resolve, reject) =>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/waitinglists.json`, 
				JSON.stringify({
				date: list.date,
				isbn: list.isbn,
				uid: list.uid
				})
				).then((results) =>{
					resolve(results);
				}).catch((error) =>{
					reject(error);
				});
		});
	};

	return{addMeToTheList: addMeToTheList};
});