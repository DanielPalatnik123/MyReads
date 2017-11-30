import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Bookshelf from './Bookshelf'
import Book from './Book'
import './App.css'


class BooksApp extends React.Component {

  //two states: books for the books on the front page, search for the books temporarily appearing on the search
  state={
    books: []
  }

  componentDidMount() {

    //set initial on mount with the books that are already available
    BooksAPI.getAll().then((response) => {
      this.setState({books: response})
    })
  }

  bookSearchHandler(query) {
    //block that will handle API requests to server coming from search.
    //If there are results, call the API, if receive no errors, then procede to setState,
    //then check if each searched book is already on 'books' array (with defined shelf),
    //if yes, set that book's shelf to reflect the one from same book in 'books', otherwise set that book's shelf to 'none'
    if (query !== "") {
      BooksAPI.search(query).then((result) => {
        if (!result.error) {
          this.setState(prevState => ({
            books: result.map((r)=>{
              if (r.imageLinks) {
                prevState.books.map((t)=>{
                  if(t.id === r.id) {
                    r.shelf=t.shelf
                    return r
                  }
                })

                if (typeof r.shelf === 'undefined') {
                  r.shelf = 'none'
                }
                return r
              }
            })
          }))
        }
      })
    }
  }

  //block that handles shelf changes. Handled differently for books on 'books' and books on 'search'
  // if the book is already on 'books', but has a different shelf, find the correct book
  // (via comparing matching id's) and change shelf to the new one, then update API.
  //For books only on 'search' - since they don't have previous shelfs, compare only id's and then set that books shelf accordingly.
  //Then append that book to the end of the 'books' array so it immediately gets displayed on the frontpage - and then update API to notify the changes.
  bookChangeHandler = (thisBook) => {

    this.setState((prevState) => ({
      books: prevState.books.filter((book) => book.id !== thisBook.thisBook.id).concat(thisBook.thisBook)
    }))

    this.setState((prevState) => ({
      books: prevState.books.map((book) => {
        if (book.id === thisBook.thisBook.id) {
          book.shelf = thisBook.shelf
        }
        return book
      })
    }))

    BooksAPI.update(thisBook.thisBook, thisBook.shelf)

  }

  render() {
    const { books }=this.state

    const shelves = [
    {
      id: 'currentlyReading',
      title: 'Currently Reading',
      books: books.filter(book => book.shelf === 'currentlyReading')
    },
    {
      id: 'wantToRead',
      title: 'Want To Read',
      books: books.filter(book => book.shelf === 'wantToRead')
    },
    {
      id: 'read',
      title: 'Read',
      books: books.filter(book => book.shelf === 'read')
    }]

    return (
      <div className="app">
        <Route path="/search" key="a" render={({ history }) => (

          //here render only the books on 'search' array
          <div className="search-books">
            <ListBooks
              onSearch={(query) => {
                this.bookSearchHandler(query)
              }}
            />
            <div className="search-books-results">
              <ol className="books-grid">
                {books.map((book) => (
                  <Book
                  thisBook={book}
                  onShelfChange={this.bookChangeHandler}
                  key={book.id} />
                ))}
              </ol>
            </div>
          </div>
        )} />

        <Route exact path="/" key="b" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map(shelf => (
                  <Bookshelf key={shelf.id} id={shelf.id} title={shelf.title} books={shelf.books} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
                className="add-contact"
              >Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
