import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../POI/rating.js'

const POICard = (props) => {
  return (
    <div className='poiCard' onClick={props.onClick}>
      <h1>{props.title}</h1>
      <img src={props.pic} alt='site'/>
      <Rating
        number={props.rating}
      />
    </div>
  )
}

export default POICard;
