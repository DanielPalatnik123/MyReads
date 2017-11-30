import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';


class Bookshelf extends React.Component {


  constructor(props) {
    super(props)
     this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    //handle change on selector, all that needs to be lifted to the parent are the book's id
    //(so you can know what is the right book) and the selected shelf value
    this.props.onShelfChange({thisBook:this.props.thisBook, shelf:e.target.value});
  }

  render() {
    const { books }=this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
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
    )
  }
}

export default Bookshelf
