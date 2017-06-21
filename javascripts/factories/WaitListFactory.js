app.factory("WaitListFactory", function($http, $q, FIREBASE_CONFIG) {
	
	let addMeToTheList = (list) => {
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

	let getList = (isbn) => {
		let nextUp = [];
		return $q((resolve, reject) =>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/waitinglists.json?orderBy="isbn"&equalTo="${isbn}"`)
			.then((waitList) =>{
			let listing = waitList.data;
			if(listing !== null){
				Object.keys(listing).forEach((key) =>{
				listing[key].id = key;
				nextUp.push(listing[key]);
				});
			}
			resolve(nextUp);
		}).catch((error) => {
			reject(error);
		});
	  });
	};

	return{addMeToTheList: addMeToTheList, getList: getList};
});