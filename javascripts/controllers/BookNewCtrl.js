app.controller("BookNewCtrl", function($location, $rootScope, $scope, BookFactory, GOOGLE_BOOKS){
		$scope.books = [];
		$scope.dropDown ="";
		$scope.searchText = "";
		let key = GOOGLE_BOOKS.apiKey;

		 $scope.setdropDown = (searchType) =>{
			$scope.dropDown = searchType;
		};

		$scope.getNewBooks = () =>{
		BookFactory.getGoogleBooksByTitle($scope.dropDown, $scope.searchText, key).then((bookz)=>{
			//console.log("books returned", bookz.data.items);
			$scope.books = bookz.data.items;
		}).catch((error)=>{
			console.log('', error);
		});
	};
	
	$scope.newBook= {};
	
		$scope.addNewBook = (item) => {
			$scope.newBook = item;
			$scope.newBook.isCheckedOut = false;
			$scope.newBook.uid = $rootScope.user.uid;
			$scope.newBook.borrowerUid = "";
			BookFactory.postNewBook($scope.newBook).then((response) =>{
				$scope.newBook = {};
				$location.url("/books/list/user");
			}).catch((error) => {
				console.log("Add error", error);
			});
		};


$scope.hideHeader = ($location.path() === '/books/new') ? true : false;


	$scope.carouselBooks = [];

	let getBooksForCarousel = () =>{
		BookFactory.getBookList().then((theBooks)=>{
		$scope.carouselBooks = theBooks;
		}).catch((error) => {
			console.log("Error getting books for carousel", error);
		});
	};

	$scope.myInterval = 4000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	let slides = $scope.slides = [];
	let currIndex = 0;

	$scope.addSlide = () =>{
    let newWidth = 140 + slides.length + 1;
    slides.push({
      image: 'http://books.google.com/books/content?id=ClHUjere8vgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' + newWidth + '/300',
      text: ["Best Seller","A Remarkable Creation","I couldn't stop reading","The author is brilliant"][slides.length % 4],
      id: currIndex++
    },
    {
	  image: 'http://books.google.com/books/content?id=RAUQ2_xcFzgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' + newWidth + '/300',
      text: ["A Remarkable Creation","I couldn't stop reading","The author is brilliant"][slides.length % 4],
      id: currIndex++
    },
    {
      image: 'http://books.google.com/books/content?id=8CngAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' + newWidth + '/300',
      text: ["I couldn't stop reading","Best Seller","A Remarkable Creation","The author is brilliant"][slides.length % 4],
      id: currIndex++
    },
    {
      image: 'http://books.google.com/books/content?id=ZSu2DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' + newWidth + '/300',
      text: ["The author is brilliant","Best Seller","A Remarkable Creation","I couldn't stop reading"][slides.length % 4],
      id: currIndex++
    });
	};

	$scope.randomize = function() {
		let indexes = generateIndexesArray();
		assignNewIndexesToSlides(indexes);
	};

	for (var i = 0; i < 4; i++) {
		$scope.addSlide();
	}

	let assignNewIndexesToSlides = (indexes) => {
		for (var i = 0, l = slides.length; i < l; i++) {
		slides[i].id = indexes.pop();
		}
	};

	let generateIndexesArray = () => {
		var indexes = [];
		for (var i = 0; i < currIndex; ++i) {
		indexes[i] = i;
		}
		return shuffle(indexes);
	};



});