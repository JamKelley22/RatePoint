import React from 'react'
import PropTypes from 'prop-types'

const Feed = (props) => {
  return (
    <div className='feedComponent'>
      <h2>Feed</h2>
      <h3>POIs</h3>
      <h3>People</h3>
      <h3>Reviews</h3>
    </div>
  )
}

export default Feed;

Feed.propTypes = {
  poiList: PropTypes.array,
  peopleList: PropTypes.array,
  reviewList: PropTypes.array
}

Feed.defaultProps = {
  poiList: [],
  peopleList: [],
  reviewList: []
}
