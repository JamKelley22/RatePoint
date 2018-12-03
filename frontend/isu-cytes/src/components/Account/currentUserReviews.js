import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../POI/rating.js'

import './account.scss'

const CurrentUserReviews = (props) => {
  return (
    <div className='tabContent currentUserReviewsComponent'>
      {
        props.reviews.length > 0
        ?
        props.reviews.map((review ,i) => {
          console.log(review);
          return (
            <div className='reviewItem' key={i}>
              <strong>{props.getPOIName(review.poi)}<br/></strong>
              {review.title}
              <Rating
                number={review.rating}
              />
              <a onClick={() => props.viewPOIByNum(review.poi)}>View POI</a>
            </div>
          )
        })
        :
        //=====
        <h3>No Reviews Yet!</h3>
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
