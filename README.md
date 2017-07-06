# The Lending Library

## Project Description

Create an application that allows users to build a collection of books they own and have available for lending. Other users can log in and see the books, and check them out.  Once a book has been checked out by a user the book, the checkout button will toggle to an add to waitinglist button.  This will allow potential users to see that the book has already been borrowed, and give them the ability to add themselves to a waitinglist.  Once a book has been returned it will automatically go to the next person on the waiting list, and if there isn't a waiting list the book will be returned to the main bookshelf with the checkout button enabled.  

[Project Specifications](https://github.com/lsimmons1832/LendingLibrary/blob/master/README.md)
![Screengrab](https://raw.githubusercontent.com/lsimmons1832/LendingLibrary/master/public/images/ScreenGrab.PNG)

As a user you can sign up to participate in the lending library.  This will create an empty bookshelf specific to the user.  The user can then go in and add books to their collection which automatically flags the books as available.

Other users can log into the application and view all books available for lending.  They can add books to their personal bookshelf collection, or checkout books added by other users.

1. Integrate Google Books API for ease of adding books to personal collection
2. Give the User's the ability to create a book collection, update their colletion, and delete books from their colletion
3. Give all User's the ability to rate books and display average rating
4. Allow User's to add themselves to a waiting list for books they are interested in borrowing

## Technologies
- HTML5
- CSS
- AngularJS
- BootStrap
