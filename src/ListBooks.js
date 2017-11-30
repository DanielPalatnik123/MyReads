import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class ListBooks extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
     this.handleSearch=this.handleSearch.bind(this);
  }

  //handle search query, if onSearch was defined, then pass query to onSearch property of this component, trimming white spaces on its sides
  handleSearch(query) {
    if (this.props.onSearch) {
      this.props.onSearch(query.trim());
    }
  }

  render() {
    //connect the query object to the onSearch prop that gets lifted to the parent
    const { query } = this.props.onSearch

    return (
      <div className="search-books-bar">
      <Link
        to="/"
        className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            //call handleSearch onChange, taking input's value
            onChange={(event) => this.handleSearch(event.target.value)}
          />
        </div>
      </div>
    )
  }
}

export default ListBooks
