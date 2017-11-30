import React from 'react'
import PropTypes from 'prop-types';

class Book extends React.Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    thisBook: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
     this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    //handle change on selector, all that needs to be lifted to the parent are the book's id
    //(so you can know what is the right book) and the selected shelf value
    this.props.onShelfChange({thisBook:this.props.thisBook, shelf:e.target.value});
  }

  confirmParam = (Param) => {
    if (typeof Param === 'undefined') {
      return "";
    }
    else {
      return Param
    }
  }

  render() {
    //render book element. All of each individual books attributes get added to their 'thisBook' prop.
    //The shelf prop here will be defined onChange according to the selected option's value
    //all the remaining values of each book get rendered through the thisBook prop
    const thisBook=this.props.thisBook
    let shelf = thisBook.shelf

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193,
              backgroundImage: `url(${this.confirmParam(thisBook.imageLinks.smallThumbnail)})`
            }}></div>
              <div className={'book-shelf-changer'}>
                <select
                value={ shelf }
                onChange={ this.handleChange }
                >
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          <div className="book-title">{thisBook.title}</div>
          <div className="book-authors">
          <ul>
            {thisBook.authors ? (
              thisBook.authors.map((author) => (
                <li key={author}>{author}</li>
              ))
            ) : ("")}
          </ul>
          </div>
        </div>
      </li>
    )
  }
}

export default Book
