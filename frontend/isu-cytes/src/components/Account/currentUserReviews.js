import React from 'react'
import PropTypes from 'prop-types'

import './account.scss'

const CurrentUserReviews = (props) => {
  return (
    <div className='tabContent currentUserReviewsComponent'>
      {
        props.reviews > 0
        ?
        props.reviews.map((review ,i) =>
          <div className='reviewItem' key={i}>
            {review.title}
            Rating: {review.rating}
          </div>
        )
        :
        //=====
        <h3>No Reviews</h3>
        //=====
      }
    </div>
  )
}

export default CurrentUserReviews;

CurrentUserReviews.propTypes = {
  reviews: PropTypes.array
}

CurrentUserReviews.defaultProps = {
  reviews: []
}
