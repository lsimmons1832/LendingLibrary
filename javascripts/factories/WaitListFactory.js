app.Factory("WaitListFactory", function($http, $q, FIREBASE_CONFIG) {
	
	let addMeToTheList = (list) => {
		return $q((resolve, reject) =>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/waitinglists.json`, 
				JSON.stringify({
					//need to stringfy
				})
				).then(() =>{

				}).catch((error) =>{
					reject(error);
				});
		});
	};

	return{addMeToTheList: addMeToTheList};
});