import React from 'react';
import PropTypes from 'prop-types';

export default function Search({search}) {
  return (
    <div className='search-container'>
      <input type='text' placeholder='Search for a District' onChange={(e) => search(e.target.value.toUpperCase())}></input>
      <p>Click on 2 districts to compare Kindergarten Attendance</p>
    </div>
  )
}

Search.propTypes = {
  search: PropTypes.func.isRequired
}