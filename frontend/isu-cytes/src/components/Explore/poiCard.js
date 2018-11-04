import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../POI/rating.js'

const POICard = (props) => {
  return (
    <div className='poiContainer'>
      <div className='poiCard' onClick={props.onClick}>
        <h1>{props.title}</h1>
        <div className='poiCardImg'>
          <img src={props.pic} alt='site'/>
        </div>
        <div className='poiCardRating'>
          <Rating
            number={props.rating}
          />
        </div>
      </div>
    </div>
  )
}

export default POICard;
